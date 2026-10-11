# MetroVision System: Intelligent Route Planner Module
**Graduation Project - Electronics and Communications Engineering (Machine Learning & AI Track)**

---

## 1. Project Overview
The **MetroVision** route planning engine is an advanced, production-ready backend service designed to calculate optimal metro routes, exact travel durations, smart fare pricing, and directional guidance using real-world GTFS datasets for the Cairo Metro network.

> محرك تخطيط الرحلات لنظام MetroVision هو خدمة خلفية (Backend) متطورة وجاهزة للإنتاج، تم تصميمها لحساب أفضل مسارات المترو، وأوقات السفر الدقيقة، وتسعير التذاكر الذكي، وتوجيهات الاتجاهات باستخدام بيانات GTFS الواقعية لشبكة مترو القاهرة.

---

## 2. System Architecture & Tech Stack
- **Language:** Python 3.x
- **Framework:** FastAPI (High-performance asynchronous API framework)
- **Graph Engine:** NetworkX (Dijkstra's Shortest Path Algorithm)
- **Data Processing:** Pandas (GTFS parsing and spatial processing)

---

## 3. API Specification & Endpoints (مواصفات نقاط الاتصال)

### Endpoint: `/calculate-route`
- **Method:** `POST`
- **Description:** Accepts bilingual station names (Arabic/English), computes the fastest path based on real GTFS time weights, calculates exact fares according to official current tariff tiers, and returns a structured JSON response.

#### Request Body Example (JSON):
```json
{
  "start_station": "حلوان",
  "end_station": "المعصرة"
}
{
  "status": "success",
  "input_start": "حلوان",
  "input_end": "المعصرة",
  "stations_count": 6,
  "estimated_time_minutes": 10.0,
  "estimated_fare": "10 جنيهات (حتى 9 محطات)",
  "direction_advice": "اركب من محطة Helwan في اتجاه Ain Helwan حتى تصل إلى وجهتك.",
  "route_path": [
    "Helwan",
    "Ain Helwan",
    "Helwan University",
    "Wadi Hof",
    "Hadayek Helwan",
    "El-Maasara"
  ]
}

## 4. Key Engineering Features

1. **Exact Time Calculation:** 
   - Dynamically computes edge weights using real scheduled arrival/departure time stamps from `stop_times.txt`.
   - *حساب الوقت الدقيق: يتم حساب أوزان المسارات ديناميكياً باستخدام طوابع زمن الوصول والمغادرة الفعلية المجدولة من جداول التشغيل.*

2. **Directional Guidance:** 
   - Automatically generates smart boarding advice and direction instructions telling the user the exact departure station and route line.
   - *توجه الرحلة والاتجاهات: توليد نصائح إركاب ذكية وتوجيهات للاتجاه تخبر المستخدم بمحطة الانطلاق والاتجاه السليم بدقة.*

3. **Bilingual Support:** 
   - Integrated custom translation mapping to seamlessly handle Arabic station queries alongside standard GTFS identifiers.
   - *دعم اللغة العربية والإنجليزية: دمج خريطة ترجمة مخصصة تتعامل بسلاسة مع استعلامات المحطات باللغة العربية بجانب المعرفات الإنجليزية.*

4. **Official Tariff Integration:** 
   - Automatically applies current official Cairo Metro pricing tiers based on precise station counts.
   - *دمج الأسعار الرسمية: تطبيق شرائح الأسعار الرسمية الحالية لمترو القاهرة تلقائياً بناءً على عدد المحطات.*

5. **Interactive Documentation:** 
   - Fully documented via Swagger UI (`/docs`) for easy testing and smooth integration with frontend teams.
   - *التوثيق التفاعلي: توثيق كامل عبر واجهة Swagger UI لتسهيل الاختبار والتحقق والتكامل السلس مع واجهة التيم.*
