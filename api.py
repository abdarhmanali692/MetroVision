from fastapi import FastAPI
import pandas as pd
import networkx as nx
from pydantic import BaseModel

app = FastAPI(title="MetroVision Professional Smart API")

# 1. قراءة البيانات
stops_df = pd.read_csv('stops.txt')
stop_times_df = pd.read_csv('stop_times.txt')
trips_df = pd.read_csv('trips.txt')
routes_df = pd.read_csv('routes.txt')

# 2. قاموس ترجمة أسماء المحطات من العربية إلى الإنجليزية
arabic_to_english_stops = {
    "حلوان": "Helwan",
    "عين حلوان": "Ain Helwan",
    "جامعة حلوان": "Helwan University",
    "وادي حوف": "Wadi Hof",
    "حدائق حلوان": "Hadayek Helwan",
    "المعصرة": "El-Maasara",
    "طره الأسمنت": "Tora Asmant",
    "التجيحي": "Tora El-Eman",
    "المعادي": "Maadi",
    "الزهراء": "El-Zahraa",
    "مارجرجس": "Mar Girgis",
    "الملك الصالح": "El-Malek El-Saleh",
    "السيدة زينب": "El-Sayeda Zeinab",
    "سعد زغلول": "Saad Zaghloul",
    "السادات": "Sadat",
    "جمال عبدالناصر": "Gamal Abd El-Nasser",
    "احمد عرابي": "Ahmed Orabi",
    "الشهداء": "El-Shohadaa",
    "روض الفرج": "Rod El-Farag",
    "السان ستيرفين": "St. Teresa",
    "المظلات": "El-Mollat",
    "المنيرة": "El-Mounira",
    "المرج": "El-Marg",
    "المرج الجديدة": "New El-Marg",
}

# 3. بناء الشبكة البيانية والأوزان الزمنية
metro_graph = nx.Graph()

for _, row in stops_df.iterrows():
    metro_graph.add_node(
        row['stop_id'], 
        name=str(row['stop_name']).strip(), 
        lat=row['stop_lat'], 
        lon=row['stop_lon']
    )

def time_to_seconds(time_str):
    try:
        parts = time_str.split(':')
        hours = int(parts[0]) % 24
        minutes = int(parts[1])
        seconds = int(parts[2])
        return hours * 3600 + minutes * 60 + seconds
    except:
        return 0

for i in range(len(stop_times_df) - 1):
    current_row = stop_times_df.iloc[i]
    next_row = stop_times_df.iloc[i+1]
    
    if current_row['trip_id'] == next_row['trip_id']:
        u = current_row['stop_id']
        v = next_row['stop_id']
        
        arr_time = time_to_seconds(str(next_row['arrival_time']))
        dep_time = time_to_seconds(str(current_row['departure_time']))
        duration = arr_time - dep_time
        weight = duration if 0 < duration < 600 else 120 
        
        if not metro_graph.has_edge(u, v):
            metro_graph.add_edge(u, v, weight=weight)

class RouteRequest(BaseModel):
    start_station: str
    end_station: str

@app.post("/calculate-route")
def calculate_route(request: RouteRequest):
    try:
        raw_start = request.start_station.strip()
        raw_end = request.end_station.strip()
        
        search_start = arabic_to_english_stops.get(raw_start, raw_start)
        search_end = arabic_to_english_stops.get(raw_end, raw_end)
        
        start_row = stops_df[stops_df['stop_name'].str.strip().str.lower() == search_start.lower()]
        end_row = stops_df[stops_df['stop_name'].str.strip().str.lower() == search_end.lower()]
        
        if start_row.empty or end_row.empty:
            return {
                "status": "error", 
                "message": f"عذراً، إحدى المحطات ('{raw_start}' أو '{raw_end}') غير موجودة في النظام."
            }
            
        start_id = start_row['stop_id'].values[0]
        end_id = end_row['stop_id'].values[0]
        
        path_ids = nx.shortest_path(metro_graph, source=start_id, target=end_id, weight='weight')
        path_length_seconds = nx.shortest_path_length(metro_graph, source=start_id, target=end_id, weight='weight')
        
        path_names = [metro_graph.nodes[node]['name'] for node in path_ids]
        stations_count = len(path_names)
        estimated_minutes = round(path_length_seconds / 60, 1)
        
        # تسعير التذكرة بالأسعار المحدثة الحالية
        if stations_count <= 9:
            fare = "10 جنيهات (حتى 9 محطات)"
        elif stations_count <= 16:
            fare = "12 جنيهاً (من 10 إلى 16 محطة)"
        elif stations_count <= 23:
            fare = "15 جنيهاً (من 17 إلى 23 محطة)"
        else:
            fare = "20 جنيهاً (أكثر من 23 محطة)"

        return {
            "status": "success",
            "input_start": raw_start,
            "input_end": raw_end,
            "stations_count": stations_count,
            "estimated_time_minutes": estimated_minutes,
            "estimated_fare": fare,
            "direction_advice": f"اركب من محطة {path_names[0]} في اتجاه {path_names[1]} حتى تصل إلى وجهتك.",
            "route_path": path_names
        }
        
    except nx.NetworkXNoPath:
        return {"status": "error", "message": "لا يوجد مسار متاح بين هاتين المحطتين"}
    except Exception as e:
        return {"status": "error", "message": str(e)}