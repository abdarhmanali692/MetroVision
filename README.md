# MetroVision System: Intelligent Route Planner Module
**Graduation Project - Electronics and Communications Engineering (Machine Learning & AI Track)**

---

## 1. Project Overview (نظرة عامة على المشروع)
The **MetroVision** route planning engine is an advanced, production-ready backend service designed to calculate optimal metro routes, exact travel durations, smart fare pricing, and directional guidance using real-world GTFS (General Transit Feed Specification) datasets for the Cairo Metro network.

## 2. System Architecture & Tech Stack (معمارية النظام والتقنيات المستخدمة)
- **Language:** Python 3.x
- **Framework:** FastAPI (High-performance asynchronous API framework)
- **Graph Engine:** NetworkX (Dijkstra's Shortest Path Algorithm)
- **Data Processing:** Pandas (GTFS parsing and spatial processing)
- **Integration Layer:** RESTful JSON API interfacing with C# .NET Frontend / Mobile Applications.

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
. Key Engineering Features (المميزات الهندسية الرئيسية)

    Exact Time Calculation: Dynamically computes edge weights using real scheduled arrival/departure time stamps from stop_times.txt rather than static approximations, ensuring optimal path selection based on actual transit schedules.
    (حساب الوقت الدقيق: يتم حساب أوزان المسارات ديناميكياً باستخدام طوابع زمن الوصول والمغادرة الفعلية المجدولة من ملفات الجدول الزمني بدلاً من التقديرات الثابتة).

    Directional Guidance: Automatically generates smart boarding advice and direction instructions telling the user the exact departure station and the correct next station/line direction to follow.
    (توجه الرحلة والاتجاهات: توليد نصائح إركاب ذكية وتوجيهات للاتجاه تخبر المستخدم بمحطة الانطلاق والاتجاه السليم للركوب حتى الوصول).

    Bilingual Support: Integrated custom translation mapping to seamlessly handle Arabic station queries alongside standard GTFS English identifiers, catering to local users natively.
    (دعم اللغة العربية والإنجليزية: دمج خريطة ترجمة مخصصة تتعامل بسلاسة مع استعلامات المحطات باللغة العربية بجانب المعرفات الإنجليزية القياسية).

    Official Tariff Integration: Automatically applies the current official Cairo Metro pricing tiers based on precise station counts, providing transparent fare estimation.
    (دمج الأسعار الرسمية: تطبيق شرائح الأسعار الرسمية الحالية لمترو القاهرة تلقائياً بناءً على عدد المحطات بدقة).

    Interactive Documentation: Fully documented via Swagger UI (/docs) for easy testing, validation, and smooth frontend integration with the C# .NET team.
    (التوثيق التفاعلي: توثيق كامل عبر واجهة Swagger UI لتسهيل الاختبار والتحقق والتكامل السلس مع واجهة تيم الـ C# .NET).