# Day 25 — GTM và mô hình thu tiền

## Trạm 1 — Chọn người trả tiền và đơn vị công việc

P-053 giúp VinFast tiếp nhận và xử lý yêu cầu đặt, đổi hoặc hủy lịch lái thử. Những trường hợp không xử lý được sẽ chuyển cho nhân viên showroom.

| Cách nói | Người duyệt | Ngân sách |
|---|---|---|
| Nền tảng quản lý lịch lái thử và chăm sóc sau đặt lịch cho VinFast. | Bộ phận chuyển đổi số, IT và vận hành. | Phần mềm/IT. |
| Công cụ thay một phần việc điều phối lịch lái thử; nhân viên showroom chỉ nhận ca khó. | Lãnh đạo vận hành bán hàng hoặc đơn vị quản lý mạng lưới showroom. | Vận hành. |

Chọn cách nói thứ hai. VinFast có thể lấy tiền từ chi phí điều phối lịch, chăm sóc khách và xử lý khách vắng mặt. Đây là công việc đang tồn tại, có người chịu trách nhiệm và có thể theo dõi bằng số lịch đã xử lý. Nếu gọi P-053 là một nền tảng AI mới, quyết định mua sẽ dễ bị chuyển sang ngân sách IT và xa hơn khỏi vấn đề vận hành cần giải quyết.

### Một job là gì?

Một job là một yêu cầu đặt mới, đổi lịch hoặc hủy lịch lái thử được hệ thống xử lý xong và ghi nhận trên DriveOps.

- Lịch mới chỉ được tính khi có mẫu xe, showroom, khung giờ, mã lịch và thông báo xác nhận cho khách.
- Lịch đổi hoặc hủy chỉ được tính khi thay đổi đã được lưu trên DriveOps và khách nhận thông báo.
- Không tính yêu cầu trùng, yêu cầu bị bỏ dở, thiếu dữ liệu bắt buộc hoặc ca nhân viên showroom phải tiếp quản.

Định nghĩa này có thể đếm bằng trạng thái của lịch. Nó cũng tách rõ phần hệ thống làm được và phần phải chuyển cho người.

## Trạm 2 — Chọn cách tính tiền

### Chấm điểm theo tình trạng hiện tại

Điểm 0 là chưa có, 1 là đã có một phần, 2 là đã có bằng chứng rõ.

| Câu hỏi | Điểm | Lý do |
|---|---:|---|
| Có ghi nhận từng job và kết quả cuối cùng không? | 1 | Tài liệu Day 23 đã định nghĩa các sự kiện `booking_confirmed`, `booking_checked_in` và các trạng thái liên quan. Tuy nhiên, phần lớn chỉ số vẫn chưa có dữ liệu vận hành thật. |
| Có kết quả kiểm thử cho P-053 không? | 0 | Báo cáo eval mới nhất trong repo P-053 ghi toàn bộ benchmark hành vi là “chưa chạy”. Chưa có số liệu để chấm chất lượng hay tỷ lệ xử lý xong. |
| VinFast đã đồng ý cách tính một job thành công chưa? | 0 | Chưa có biên bản pilot, hợp đồng hoặc xác nhận của khách hàng. |
| Có tách được kết quả do hệ thống tạo ra với các yếu tố khác không? | 1 | Hệ thống phân biệt được lịch đã xác nhận và khách đã có mặt. Nhưng việc khách có tới showroom còn phụ thuộc vào khách và showroom, không chỉ do P-053. |
| Định nghĩa job đã chặt chưa? | 2 | Trạng thái lịch và các trường hợp không tính đã được ghi rõ ở Trạm 1. |
| **Tổng khả năng xác định kết quả** | **4/10** | Chưa đủ để bán thuần theo kết quả. |

| Câu hỏi | Điểm | Lý do |
|---|---:|---|
| AI tự hoàn tất job từ đầu đến cuối không cần người giữa chừng? | 0 | Luồng đặt lịch có thể tự phục vụ, nhưng chưa có bằng chứng rằng AI đang tự điều phối toàn bộ các ca thật. |
| Hệ thống đã chạy ngoài giờ mà không cần người trực chưa? | 0 | Chưa có số liệu vận hành. |
| Hệ thống tự chuyển đúng ca khó cho người chưa? | 0 | Chưa có quy tắc chuyển ca và số liệu kiểm chứng. |
| Tỷ lệ ca cần người hỗ trợ có dưới 20% chưa? | 0 | Chưa đo được. |
| Nhân viên chỉ kiểm tra mẫu thay vì xử lý từng ca chưa? | 0 | Chưa có quy trình và dữ liệu kiểm tra mẫu. |
| **Tổng mức tự động** | **0/10** | Chưa đủ để hứa mức tự động cao. |

Day 21 là bộ eval của sản phẩm VLearn AI Tutor, không phải P-053, nên không dùng làm bằng chứng cho P-053. Báo cáo eval mới nhất của P-053 chưa chạy benchmark hành vi. Vì vậy, P-053 cần chạy lại benchmark và pilot trước khi dùng bất cứ tỷ lệ tự động nào để bán theo kết quả.

### Hai sản phẩm để đối chiếu

| Sản phẩm | Cách tính tiền | Giá công bố | Vì sao có liên quan |
|---|---|---|---|
| Salesforce Agentforce | Theo lượt hành động. | 500 USD cho 100.000 Flex Credits. Một hành động dùng 20 credits, tương đương 0,10 USD. Ví dụ đặt lịch dịch vụ của Salesforce dùng 5 hành động, tương đương 0,50 USD mỗi lịch. | Đây là ví dụ công khai gần nhất với việc tìm khung giờ và đặt lịch. |
| Intercom Fin | Gói nền kết hợp số kết quả xử lý xong. | 49 USD/tháng đã gồm 50 kết quả; phần vượt tính 0,99 USD mỗi kết quả. | Khác ngành, nhưng cùng cách xử lý một yêu cầu của khách rồi mới tính tiền. Fin cũng nêu rõ ca chuyển người do lỗi hoặc do khách yêu cầu không bị tính. |

Giá đã kiểm tra ngày 27/08/2026: [Salesforce Agentforce](https://www.salesforce.com/agentforce/pricing/) và [Intercom Fin](https://fin.ai/help/en/articles/13975800-fin-pricing-outcomes).

### Quyết định

Chọn **Hybrid**: phí nền theo mỗi showroom mỗi tháng, kèm phí theo số yêu cầu đặt, đổi hoặc hủy lịch đã xử lý vượt mức đã thỏa thuận.

Phí nền trả cho website đặt lịch, DriveOps, dữ liệu lịch, phân quyền và hỗ trợ cơ bản. Phần vượt mức giúp chi phí của P-053 tăng cùng lượng công việc, nhưng khách vẫn biết trước phần chi phí tối thiểu. Chưa nên bán thuần theo Outcome vì P-053 chưa có dữ liệu pilot để chứng minh mức tự động và chưa tách được đầy đủ ảnh hưởng của hệ thống với ảnh hưởng từ khách hoặc showroom.

### Nội dung để điền vào tab `3_Value_Metric`

| Ô | Giá trị |
|---|---|
| B5:B9 | 1, 0, 0, 1, 2 |
| B13:B17 | 0, 0, 0, 0, 0 |
| A26:D26 | Salesforce Agentforce \| Usage \| 500 USD/100.000 credits; 0,10 USD/action; ví dụ đặt lịch 0,50 USD/lịch \| https://www.salesforce.com/agentforce/pricing/ |
| A27:D27 | Intercom Fin \| Hybrid \| 49 USD/tháng gồm 50 outcomes; 0,99 USD/outcome vượt mức \| https://fin.ai/help/en/articles/13975800-fin-pricing-outcomes |
| B30 | Hybrid |
| B31 | Để trống vì quyết định trùng với gợi ý của model. |
| B32 | Phí nền theo showroom mỗi tháng, kèm phí cho số job xử lý vượt mức. |
| B33 | Điểm xác định kết quả là 4/10. Benchmark hành vi của P-053 chưa chạy; mức tự động là 0/10 vì chưa có dữ liệu vận hành. |
| B34 | Mô hình dễ lỗ nếu số ca phải chuyển cho người cao hoặc số job vượt mức tăng nhanh mà giá phần vượt không đủ bù chi phí. |

### Nguồn trong bài làm trước

- [Day 23 — bộ chỉ số của P-053](../Track1_Day23_2A202601764_NguyenHoangMinh/draft/metrics-pack.md)
- [Báo cáo kiểm thử P-053](../Downloads/agent-evaluation.md)
- [Day 24 — mô hình tài chính](../Track1_Day24_2A202601764_NguyenHoangMinh/README.md)

## Trạm 3 — Chi phí cho một job và vùng giá

### Cách tính đã chọn

P-053 bán theo mô hình Hybrid nên chọn biến thể A: VinFast và showroom tự xử lý các ca phải chuyển người. P-053 vẫn chịu chi phí kiểm tra chất lượng nội bộ.

Từ dữ liệu Day 24, 9.369 lịch trong 85 ngày tương đương khoảng 3.353 job mỗi tháng. Chưa có số containment thật, vì benchmark hành vi chưa chạy. Mô hình tạm dùng 50% để lập kế hoạch, tức 1.676,5 job hoàn thành mỗi tháng. Đây là giả định thận trọng, không phải kết quả eval.

P-053 đang dùng `gpt-5.6-luna`. Cấu hình mặc định của dự án đang để giá cũ; mô hình này cập nhật theo giá OpenAI kiểm tra ngày 27/08/2026: 0,20 USD cho một triệu token đầu vào, 0,02 USD cho token đầu vào đã cache, 0,25 USD cho một triệu token ghi cache và 1,20 USD cho một triệu token đầu ra.

| Giả định cho một job | Giá trị | Ghi chú |
|---|---:|---|
| Số lượt gọi model | 2 | Một lượt phân loại yêu cầu và một lượt trả lời hoặc gọi công cụ. Đây là giả định an toàn; thao tác đặt lịch có cấu trúc có thể không cần gọi model. |
| Token cache được mỗi lượt | 2.000 | Hướng dẫn hệ thống và công cụ dùng lại. |
| Token mới mỗi lượt | 500 | Câu hỏi, mã lịch và dữ liệu thay đổi theo từng người dùng. |
| Token đầu ra mỗi lượt | 700 | Dùng mức dự phòng đang có trong cấu hình dự án. |
| Hạ tầng mỗi job | 0,05 USD | Phân bổ cho Cloud Run, PostgreSQL, Redis, Chroma, log, email và dữ liệu. Chưa có hóa đơn pilot nên đây là giả định cần thay bằng số thực tế. |
| Tỷ lệ gọi lại | 8% | Mức dự phòng trong khung 5–10% của bài lab. |
| Kiểm tra chất lượng nội bộ | 20% job, 6 phút/ca, 5 USD/giờ | Chọn cao hơn mức thông thường vì P-053 chưa có dữ liệu vận hành. |
| Chi phí chung mỗi tháng | 3.076,92 USD | Quy đổi 80.000.000 đồng chi phí cố định/tháng của Day 24 theo tỷ giá giả định 26.000 đồng/USD. |

Sản phẩm hiện không có cuộc gọi thoại nên chi phí chuyển giọng nói và gọi điện được để bằng 0. Không dùng Batch API vì đặt, đổi và hủy lịch phải trả kết quả ngay.

### Kết quả tính toán

| Khoản | Kết quả |
|---|---:|
| Chi phí model cho một job, có cache | 0,00242 USD |
| Chi phí model cho một job, không cache | 0,00268 USD |
| Phần tiết kiệm nhờ cache | 9,7% |
| Chi phí biến đổi và kiểm tra chất lượng mỗi tháng | 511,71 USD |
| **Cost/Job, chưa gồm chi phí chung** | **0,305 USD** (khoảng 7.936 đồng) |
| Cost/Job, gồm chi phí chung | 2,141 USD |

Chi phí kiểm tra chất lượng chiếm phần lớn chi phí trực tiếp. Đây là kết quả hợp lý ở giai đoạn chưa có dữ liệu pilot; không nên bỏ khoản này để làm tỷ suất lợi nhuận đẹp hơn.

### Giá đề xuất

Giá 0,99 USD cho một job chỉ áp dụng cho phần vượt mức trong hợp đồng. Phí nền vẫn giữ theo Day 24 là 5.000.000 đồng mỗi showroom mỗi tháng; phí nền trả cho website, DriveOps, dữ liệu lịch, phân quyền và hỗ trợ cơ bản.

Để kiểm tra giá trần, mô hình dùng một showroom với khoảng 11 job mỗi tháng. Giá trị tiết kiệm tạm tính là 120 USD/tháng, tương ứng khoảng 20% thời gian của một nhân viên điều phối có chi phí 600 USD/tháng. Đây cũng là giả định cần kiểm chứng trong pilot.

| Chỉ số | Kết quả |
|---|---:|
| Giá sàn, bằng 3 lần Cost/Job | 0,916 USD/job |
| Giá trần theo 10–25% giá trị tiết kiệm | 1,09–2,73 USD/job |
| Giá bán đề xuất | **0,99 USD/job** (25.740 đồng) |
| Gross Margin trên phần phí vượt mức | **69,2%** |
| Containment tối thiểu để giữ Gross Margin 60% | **38,5%** |
| Containment đang dùng để lập kế hoạch | 50% — chưa đo |

Mô hình vẫn giữ Gross Margin trên 60% với giả định 50%. Nếu containment xuống dưới khoảng 31%, Gross Margin sẽ dưới 50%. Việc phải làm trước khi bán phần phí vượt mức là chạy benchmark hành vi, theo dõi containment trong pilot và thay ba giả định chưa có dữ liệu: tỷ lệ gọi lại, chi phí hạ tầng và thời gian kiểm tra chất lượng.

### Nội dung để điền vào tab `1_Cost_Job`

| Ô | Giá trị |
|---|---|
| B5 | Một yêu cầu đặt mới, đổi lịch hoặc hủy lịch lái thử được hệ thống xử lý xong và ghi nhận trên DriveOps. |
| B6 | A |
| B9 | 3.353 |
| B10 | 50% — giả định lập kế hoạch, chưa đo |
| B15:B18 | 0,20; 1,20; 0,25; 0,02 |
| B19:B22 | 2; 2.000; 500; 700 |
| B30 | 0 |
| B34:B37 | 0; 0; 0; 0 |
| B41:B42 | 0,05; 0 |
| B46 | 8% |
| B50:B53 | 5; 20%; 6; 10 |
| B59 | 3.076,92 |
| B68 | 26.000 — giả định quy đổi đang dùng trong bài |

### Nội dung để điền vào tab `2_Pricing`

| Ô | Giá trị |
|---|---|
| B6 | 3 |
| B10 | 120 |
| B11 | 11 |
| B14 | 600 |
| B19 | 0,99 |
| B32 | 60% |

### Nội dung để điền vào tab `6_Benchmarks`

| Ô | Giá trị |
|---|---|
| B3 | 27/08/2026 |

Nguồn giá model: [GPT-5.6 Luna — OpenAI](https://developers.openai.com/api/docs/models/gpt-5.6-luna). Nguồn khối lượng, chi phí cố định và phí nền: [Day 24 — mô hình tài chính](../Track1_Day24_2A202601764_NguyenHoangMinh/README.md). Cấu hình kỹ thuật của model: [P-053 config](../AI20K-Build/P-053/backend/src/config.py).

## Trạm 4 — Kênh phân phối và kiểm tra khả năng chi trả

### Kênh đã chọn

Chọn **Sales-Led**, theo cách bán pilot trực tiếp cho VinFast rồi mở rộng theo mạng lưới showroom. P-053 cần kết nối dữ liệu lịch, quy trình DriveOps, phân quyền và cách xử lý ngoại lệ của showroom. Vì vậy, khách không thể tự đăng ký và tự dùng như một sản phẩm PLG. Cũng chưa có đối tác nền tảng nào đã đồng ý cùng bán hoặc triển khai, nên không chọn Partner-Led.

90 ngày đầu dùng hình thức founder-led sales: làm việc trực tiếp với đơn vị vận hành bán hàng và nhóm phụ trách chuyển đổi số của VinFast để chốt pilot 3–5 showroom. Mục tiêu của pilot không chỉ là chứng minh sản phẩm chạy được, mà là thống nhất điều kiện mở rộng toàn mạng lưới nếu các chỉ số đạt yêu cầu.

### Kiểm tra bằng số

Mô hình dưới đây coi VinFast là một khách hàng doanh nghiệp, còn 319 showroom là đơn vị triển khai trong cùng hợp đồng. Đây là cách tính phù hợp với việc mua tập trung; không dùng giá của một showroom để kết luận về khả năng nuôi đội bán hàng.

| Chỉ số | Cách tính | Kết quả |
|---|---|---:|
| Doanh thu bình quân mỗi tháng từ một hợp đồng toàn mạng lưới | 319 showroom × 5.000.000 đồng / 26.000 | 61.346 USD |
| Giá trị hợp đồng năm | 61.346 × 12 | 736.154 USD |
| Gross Margin dùng để tính CAC | Từ Trạm 3 | 69,2% |
| Ngân sách CAC tối đa | 61.346 × 69,2% × 24 tháng | **1.018.380 USD/khách** |
| Số deal cần chốt mỗi ngày của một AE | 500.000 USD quota năm / 736.154 USD ACV / 250 ngày | **0,003 deal/ngày** |
| CAC tham chiếu | 11.200 USD/cơ hội / 25% tỷ lệ thắng | **44.800 USD/khách** |
| Tỷ lệ CAC tham chiếu so với ngân sách | 44.800 / 1.018.380 | **4,4%** |

Ngân sách CAC cao hơn CAC tham chiếu khoảng 22,7 lần, nên bán trực tiếp có thể chấp nhận được nếu hợp đồng mở rộng được ký ở cấp mạng lưới. Số 0,003 deal/ngày không có nghĩa một AE chỉ cần làm rất ít việc; nó cho thấy đây là thương vụ doanh nghiệp lớn, cần quy trình bán dài và không thể đánh giá bằng số đơn hàng mỗi ngày như bán cho từng showroom.

Con số 44.800 USD là phép kiểm tra thận trọng, không phải dự toán chi tiêu của P-053. Nó dùng chi phí một cơ hội 11.200 USD cho phân khúc doanh nghiệp trong tài liệu lab và tỷ lệ thắng 25%. Ở giai đoạn đầu, P-053 chưa nên chi số tiền này: đội sáng lập tự bán pilot, ghi lại chi phí thật và chỉ mở rộng khi khách xác nhận lộ trình triển khai toàn mạng lưới.

### So sánh ba kênh

Điểm 1 là không phù hợp; điểm 5 là rất phù hợp với tình trạng hiện tại.

| Tiêu chí | PLG | Sales-Led | Partner-Led |
|---|---:|---:|---:|
| Ngân sách CAC có đủ cho kênh | 2 | 5 | 1 |
| Khách quen mua theo cách này | 1 | 5 | 1 |
| Đội hiện có thể bắt đầu | 2 | 3 | 1 |
| Có thể tiếp cận đúng người trong 30 ngày | 2 | 2 | 1 |
| Đi thẳng vào vấn đề điều phối lịch | 1 | 5 | 2 |
| Đo kết quả được trong 90 ngày | 2 | 4 | 2 |
| **Tổng** | **10/30** | **24/30** | **8/30** |

Sales-Led có điểm cao nhất. Điểm tiếp cận mới là 2/5 vì chưa có xác nhận cuộc hẹn với người quyết định; đây là rủi ro cần giải quyết ngay trong tháng đầu, không phải điều được phép giả định.

### Việc cần làm trong 30 ngày

Tiếp cận trực tiếp VinFast để xin một pilot 3–5 showroom, đồng thời đề xuất trước tiêu chí mở rộng: tỷ lệ booking hoàn tất, tỷ lệ phải chuyển người, thời gian xử lý và điều khoản giá cho phần mở rộng. Nếu sau 30 ngày không có người bảo trợ ở phía VinFast hoặc không có đường đi từ pilot đến hợp đồng toàn mạng lưới, dừng đầu tư cho sales-led quy mô lớn và đánh giá lại kênh.

### Nội dung để điền vào tab `4_Channel_Fit`

| Ô | Giá trị |
|---|---|
| B5 | 61.346,15 |
| B7 | Enterprise |
| B10 | 736.153,85 |
| B13 | 500.000 |
| B14 | 250 |
| B20 | 11.200 |
| B21 | 25% |
| B26:B31 | PLG: 2, 1, 2, 2, 1, 2 |
| D26:D31 | Sales-Led: 5, 5, 3, 2, 5, 4 |
| F26:F31 | Partner-Led: 1, 1, 1, 1, 2, 2 |
| B38 | Sales-Led |
| B39 | Không áp dụng — chưa chọn Partner-Led. |
| B40 | Chưa có đối tác. |
| B41 | Không áp dụng. |
| B42 | Trong 30 ngày, tiếp cận VinFast để chốt pilot 3–5 showroom và thống nhất điều kiện mở rộng toàn mạng lưới. |

Tham chiếu: [Bessemer — Scaling to $100 Million](https://www.bvp.com/atlas/scaling-to-100-million) dùng mốc payback tối đa 24 tháng cho enterprise; [Tomasz Tunguz — Inside Sales](https://tomtunguz.com/smallest-acv-to-justify-inside-sales-team/) dùng để kiểm tra số deal cần chốt; [ICONIQ — State of GTM 2026](https://www.iconiq.com/growth/reports/state-of-go-to-market-2026) là nguồn của mức chi phí cơ hội tham chiếu trong tài liệu lab.

## Trạm 5 — Pain Moment và kế hoạch 90 ngày

### Pain Moment và điểm nhúng

**Giả thuyết Pain Moment:** từ 20:00 đến 22:00, khách vừa xem xe sau giờ làm và muốn chốt, đổi hoặc hủy lịch lái thử khi showroom không còn người trả lời ngay. Lúc đó họ đang xem trang chi tiết xe hoặc luồng đặt lịch trên điện thoại. Sản phẩm phải xuất hiện ngay trong trang đó.

Điểm nhúng là nút “Đặt lịch lái thử với ViVi” và khung chat/đặt lịch nằm trong trang chi tiết xe hoặc trang đặt lịch hiện có của VinFast. Sau khi lịch được tạo, link xác nhận dẫn lại đúng luồng tra cứu, đổi hoặc hủy lịch. Nhân viên showroom vẫn dùng DriveOps để xem lịch và nhận ca được chuyển sang.

Đây mới là giả thuyết cần kiểm chứng trong tháng đầu vì P-053 chưa có dữ liệu về giờ khách đặt lịch thật. Không lấy Zalo làm điểm nhúng chính trong pilot: cấu hình dự án đang tắt kênh Zalo và báo cáo rủi ro còn nêu vấn đề xác thực liên kết Zalo.

### Kế hoạch 90 ngày

| Giai đoạn | Mục tiêu | Kênh | Số khách | Việc cụ thể | KPI và điều kiện chuyển giai đoạn | Người chịu trách nhiệm |
|---|---|---|---|---|---|---|
| **Tháng 1 — Học** | Xác nhận vấn đề và điều kiện pilot. | Founder-led Sales-Led. | 1 khách mục tiêu: VinFast; xin pilot tại 3–5 showroom. | 1) Nguyễn Hoàng Minh chuẩn bị đề xuất pilot, tiếp cận 1 đầu mối vận hành bán hàng và 1 đầu mối chuyển đổi số. 2) Phỏng vấn tối thiểu 3 quản lý showroom về giờ cao điểm, cách xử lý đặt/đổi/hủy lịch và thời gian xử lý hiện tại. 3) Chạy 37 ca eval đang hoạt động; xử lý các lỗi P0 liên quan đến booking công khai trước khi dùng dữ liệu thật. | Có đầu mối bảo trợ và cuộc họp về pilot; có 3 buổi phỏng vấn; có kết quả của 37 ca eval; không còn lỗi P0 trong luồng booking công khai. Nếu thiếu một trong bốn điều kiện này, chưa đưa khách thật vào pilot. | Nguyễn Hoàng Minh. Đầu mối phía VinFast: chưa xác định. |
| **Tháng 2–3 — Đòn bẩy** | Chạy pilot nhỏ, đo được hiệu quả thay vì mở rộng sớm. | Sales-Led, họp rà soát hằng tuần với nhóm pilot. | 1 pilot tại 3–5 showroom; tối thiểu 100 yêu cầu đủ điều kiện đo. | 1) Nhúng widget đặt lịch vào luồng web được VinFast duyệt. 2) Ghi trạng thái từng yêu cầu: tự xử lý, chuyển người, lỗi hoặc khách bỏ dở. 3) Rà soát mỗi tuần với showroom; sửa lỗi luồng booking, đổi lịch, hủy lịch và thông báo. | Tối thiểu 100 yêu cầu có log đầy đủ; containment đạt từ 50% trở lên; tỷ lệ retry không quá 8%; không có sự cố bảo mật nghiêm trọng; có báo cáo pilot được phía khách xác nhận. Nếu containment dưới 38,5%, không mở rộng vì chưa đạt ngưỡng Gross Margin 60% của Trạm 3. | Nguyễn Hoàng Minh; đầu mối vận hành VinFast khi pilot được duyệt. |
| **Tháng 4+ — Mở rộng** | Mở rộng có chọn lọc sau khi pilot đạt ngưỡng. | Sales-Led, hợp đồng mở rộng theo mạng lưới. | Từ 5 lên 20 showroom có lượng đặt lịch trực tuyến cao. | 1) Chốt điều khoản triển khai, phí nền theo showroom và mức dùng bao gồm. 2) Chuẩn hóa cách cài widget, hướng dẫn DriveOps và quy trình chuyển ca. 3) Mở rộng từng đợt 5 showroom, không mở đồng loạt. | Pilot đạt toàn bộ điều kiện tháng 2–3; ít nhất một người bảo trợ của VinFast xác nhận kế hoạch mở rộng; báo cáo tháng đầu tại showroom mở rộng vẫn giữ containment từ 50% trở lên. | Nguyễn Hoàng Minh; người bảo trợ phía VinFast cần được ghi tên trước khi ký mở rộng. |

Ngách đầu tiên chỉ là luồng đặt, đổi và hủy lịch lái thử tại các showroom có nhiều khách đặt trực tuyến. Không mở sang chăm sóc sau bán, tư vấn xe hoặc các ngành khác trong 90 ngày đầu. Quyết định mở rộng phải dựa trên log pilot, không dựa trên demo.

### Nội dung để điền vào tab `5_90Day_Plan`

| Ô | Giá trị |
|---|---|
| B5 | 20:00–22:00, sau giờ làm. Đây là giả thuyết cần kiểm chứng bằng log pilot. |
| B6 | Khách xem xe, muốn đặt, đổi hoặc hủy lịch lái thử khi showroom không còn người trả lời ngay. |
| B7 | Trang chi tiết xe hoặc luồng đặt lịch trên điện thoại của VinFast. |
| B8 | Nút “Đặt lịch lái thử với ViVi” và khung chat/đặt lịch nhúng ngay trong trang xe hoặc trang đặt lịch hiện có; DriveOps dùng cho nhân viên showroom. |
| B12:D12 | Founder-led Sales-Led \| Sales-Led, họp pilot hằng tuần \| Sales-Led, hợp đồng mở rộng |
| B13:D13 | 1 VinFast; xin pilot 3–5 showroom \| 1 pilot, 3–5 showroom, ít nhất 100 yêu cầu \| Mở từ 5 lên 20 showroom |
| B14:D14 | Chuẩn bị đề xuất và tiếp cận 2 đầu mối phía VinFast \| Nhúng widget vào luồng web được duyệt \| Chốt điều khoản triển khai và giá theo showroom |
| B15:D15 | Phỏng vấn ít nhất 3 quản lý showroom, lấy dữ liệu giờ cao điểm và luồng hiện tại \| Ghi trạng thái từng yêu cầu và rà soát hằng tuần \| Chuẩn hóa cài đặt widget, DriveOps và quy trình chuyển ca |
| B16:D16 | Chạy 37 ca eval; xử lý lỗi P0 của luồng booking công khai \| Sửa lỗi booking, đổi/hủy lịch và thông báo theo dữ liệu pilot \| Mở rộng từng đợt 5 showroom |
| B17:D17 | Có đầu mối bảo trợ, 3 phỏng vấn, 37 ca eval có kết quả, không còn lỗi P0 \| 100 yêu cầu có log; containment ≥50%; retry ≤8%; không có sự cố bảo mật nghiêm trọng \| Giữ containment ≥50% tại nhóm showroom mở rộng |
| B18:D18 | Nguyễn Hoàng Minh; đầu mối VinFast chưa xác định \| Nguyễn Hoàng Minh; đầu mối vận hành VinFast sau khi duyệt pilot \| Nguyễn Hoàng Minh; người bảo trợ VinFast phải được ghi tên trước khi mở rộng |

Nguồn kiểm tra hiện trạng: [README của P-053](../AI20K-Build/P-053/README.md), [báo cáo eval P-053](../AI20K-Build/P-053/eval/results/agent-evaluation.md) và [báo cáo lỗi/rủi ro](../AI20K-Build/P-053/BUG.md).

## Trạm 6 — Evidence Pack và One-Pager

### Evidence Pack

| Tài sản | Tình trạng | Nội dung hoặc việc cần làm | Người phụ trách và hạn |
|---|---|---|---|
| Eval Results | Chưa có kết quả dùng để bán. | Báo cáo hiện có bộ 39 ca nhưng chưa chạy 37 ca đang hoạt động. Cần chạy, xuất task success, containment, tỷ lệ chuyển người và lỗi theo từng ca. | Nguyễn Hoàng Minh — 26/09/2026. |
| Risk Checklist | Có bản rà soát, chưa đủ điều kiện production. | Báo cáo P-053 đang nêu lỗi P0 ở liên kết Zalo, cổng admin, XSS và truy cập chéo dữ liệu booking. Chỉ dùng dữ liệu thật sau khi các lỗi này được khắc phục và kiểm tra lại. | Nguyễn Hoàng Minh — 19/09/2026. |
| Pilot Report | Chưa có. | Pilot tại 3–5 showroom, tối thiểu 100 job có log. Báo cáo phải nêu containment, thời gian xử lý, retry, số ca chuyển người và phần thời gian tiết kiệm. | Nguyễn Hoàng Minh — mục tiêu 01/10/2026, sau khi VinFast duyệt pilot. |

Ba câu trả lời hiện có cho Procurement:

- **AI có thể trả lời sai không?** Có. Vì thế P-053 chưa được phép hứa tỷ lệ tự động hay bán thuần Outcome. Các hành động đặt lịch phải đi qua dữ liệu và công cụ có cấu trúc; những ca thiếu dữ liệu, mâu thuẫn hoặc không rõ yêu cầu phải chuyển cho người. Kết quả 37 ca eval và pilot là điều kiện trước khi mở rộng.
- **Dữ liệu có dùng để huấn luyện model không?** Dữ liệu gửi qua OpenAI API không được dùng để huấn luyện mặc định, trừ khi tổ chức chủ động chọn chia sẻ. Tuy nhiên, mặc định vẫn có abuse-monitoring logs có thể giữ tối đa 30 ngày. Trước pilot cần chốt dự án API, cấu hình lưu trữ, DPA và thời hạn lưu giữ với VinFast. [Chính sách dữ liệu API của OpenAI](https://platform.openai.com/docs/models/default-usage-policies-by-endpoint)
- **Nếu startup ngừng hoạt động thì dữ liệu ở đâu?** Booking hiện nằm trong PostgreSQL do P-053 vận hành và có thể xuất bản sao dữ liệu. Tuy nhiên, chưa có cam kết hợp đồng về quyền sở hữu dữ liệu, tần suất sao lưu, thời gian khôi phục hay bàn giao. Cần có tài liệu exit plan trước khi nhận dữ liệu thật.

### One-Pager

Đã tạo [Monetization One-Pager](/Users/nguyenhoangminh/Track1_Day25_2A202601764_NguyenHoangMinh/outputs/Day25-Monetization-One-Pager-NguyenHoangMinh.docx) từ mẫu đi kèm. Tất cả số giá, biên lợi nhuận, CAC và containment trong file đều ghi kèm ô nguồn trong workbook.

### Nội dung để điền phần Evidence Pack trong tab `5_90Day_Plan`

| Ô | Giá trị |
|---|---|
| B23 | Chưa |
| C23 | Chạy 37 ca eval đang hoạt động; xuất task success, containment, tỷ lệ chuyển người và lỗi theo từng ca. |
| D23 | Nguyễn Hoàng Minh — 26/09/2026 |
| B24 | Có bản rà soát; chưa đạt điều kiện production |
| C24 | Đóng lỗi P0 ở booking công khai; hoàn thiện DPA, chính sách dữ liệu và exit plan trước khi dùng dữ liệu thật. |
| D24 | Nguyễn Hoàng Minh — 19/09/2026 |
| B25 | Chưa |
| C25 | Pilot 3–5 showroom, tối thiểu 100 job; báo cáo containment, thời gian xử lý, retry và tiết kiệm. |
| D25 | Nguyễn Hoàng Minh — mục tiêu 01/10/2026, sau khi VinFast duyệt pilot |
| B29:B31 | Chưa kiểm tra với người lạ |
| B32 | Chưa thực hiện. Mục tiêu là không quá 3 câu hỏi lại. |

### Kết quả phản biện

Đã dùng bộ prompt phản biện theo đúng mục đích kiểm tra, không dùng để viết thay bài. Các kết luận dưới đây là phần đã giữ lại sau khi đối chiếu với repo và mô hình.

| Prompt | Kết luận | Quyết định |
|---|---|---|
| Cost/Job Stress Test | Phép chia hiện dùng 1.676,5 job hoàn thành, không dùng 3.353 job thử. Nếu chia nhầm cho job thử, Cost/Job giảm sai 50%. Phép tính token 0,00242 USD/job là khớp với giả định; khoản lớn nhất là QA, không phải model. | Chấp nhận. Trước pilot phải đo lại chi phí hạ tầng, log, sao lưu, email/SMS và thời gian QA. |
| Cost/Job Stress Test | Rủi ro phá mô hình là phí nền có bao nhiêu job gồm sẵn. Nếu phần gồm sẵn quá cao, 0,99 USD/job chỉ thu ở phần vượt sẽ không bù chi phí của các job trong gói. | Chấp nhận. Chưa báo giá cuối cùng khi chưa chốt mức job bao gồm trong phí nền. |
| Value Metric Challenger | Hybrid vẫn là lựa chọn đúng: chưa có eval chứng minh autonomy và attribution, nhưng phí nền trả cho phần cố định; phần vượt mức chia sẻ rủi ro về lượng dùng. | Giữ Hybrid. Không chuyển sang Outcome cho đến khi có kết quả pilot. |
| Channel Reality Check | Sales-Led chỉ hợp lý ở cấp hợp đồng toàn mạng lưới. Pilot 3–5 showroom chỉ có giá trị hợp đồng năm khoảng 6.923–11.538 USD, không đủ để trả CAC của một sales motion có đội ngũ. | Chấp nhận. Pilot phải do founder tự bán và cần điều khoản mở rộng rõ ràng trước khi đầu tư sales. |
| Procurement Objection Simulator | Điểm yếu nhất hiện nay là bảo mật dữ liệu booking: báo cáo vẫn có lỗi P0/P1 và chưa có DPA hay exit plan. | Chấp nhận. Không đưa dữ liệu thật vào production trước mốc Risk Checklist. |
| One-Pager Defensibility Check | Ba số chưa có bằng chứng vận hành là containment 50%, tiết kiệm 120 USD/showroom/tháng và CAC 44.800 USD. Hai số đầu là giả định kế hoạch; số CAC là benchmark, không phải CAC thật của P-053. | Chấp nhận. One-Pager đã gắn nhãn các số này; phải thay bằng số pilot trước khi gửi cho khách thật. |
| Price-Change Watch | Giá GPT-5.6 Luna được kiểm tra ngày 27/08/2026 và chưa được dùng như giá khuyến mại. Model chỉ chiếm 0,00242 USD trong 0,305 USD Cost/Job, nên đổi nhà cung cấp model không giải quyết được bài toán biên lợi nhuận. | Chấp nhận. Ưu tiên giảm thời gian QA và đo chi phí hạ tầng; không dùng Batch vì luồng đặt lịch cần phản hồi ngay. |

Mười câu Procurement cần trả lời trước khi duyệt pilot: quyền truy cập booking; cách xác thực OTP; nơi lưu PII; thời hạn lưu log; data có được dùng để train; danh sách nhà cung cấp phụ; cách xử lý incident; kết quả eval và giới hạn của AI; sao lưu và khôi phục; quyền xuất và xóa dữ liệu khi chấm dứt. Hiện câu yếu nhất là quyền truy cập booking và bảo mật PII vì báo cáo Risk Checklist còn ghi lỗi P0/P1. Evidence Pack tối thiểu để được xem xét là: báo cáo eval đã chạy, bản sửa lỗi P0 có kiểm tra lại, sơ đồ dữ liệu và DPA, chính sách lưu log, cùng exit plan có thử xuất dữ liệu.

### Bài test người lạ

Chưa có người ngoài dự án đọc One-Pager trong hai phút, nên chưa tự đánh dấu là đạt. Khi làm test, người đọc phải trả lời được ba ý: P-053 bán cho VinFast để xử lý lịch lái thử; thu phí nền theo showroom và 0,99 USD cho job vượt mức; kênh đầu là pilot Sales-Led vì hợp đồng toàn mạng lưới có khả năng chi trả CAC. Nếu họ phải hỏi lại quá ba câu, sửa One-Pager trước khi dùng.

## Kiểm tra kết quả trước khi nộp

### Kết luận

**Chưa đạt điều kiện nộp.** Nội dung của P-053 đã được hoàn thiện trong README và One-Pager, nhưng file `inputs/Day25-AI-Product-GTM-Monetization-Model.xlsx` vẫn là file mẫu chưa được điền bằng số của P-053. Vì vậy, các số trong One-Pager chưa thể truy ngược về đúng ô trong file Excel nộp bài.

### Sáu checkpoint

| Checkpoint | Trạng thái | Nhận xét |
|---|---|---|
| 1. Ngân sách và Job | Đạt về nội dung; chưa đạt trong Excel | README có câu định vị, ngân sách vận hành và định nghĩa job có thể đếm. Nhưng tab `1_Cost_Job` vẫn ghi job ví dụ “1 ticket được giải quyết xong”, không phải job P-053. |
| 2. Value Metric | Đạt về nội dung; chưa đạt trong Excel | README có Hybrid, Decision Note và 2 benchmark có link. Nhưng tab `3_Value_Metric` vẫn đang có Attribution 5/10, Autonomy 5/10 và chọn Outcome; đây là dữ liệu mẫu, trái với quyết định P-053 là 4/10, 0/10, Hybrid. |
| 3. Cost/Job và giá | Chưa đạt | README có đủ API, Infra, Retry, HITL, Overhead; Cost/Job 0,305 USD; giá 0,99 USD; GM 69,2%; breakeven 38,5%. Nhưng Excel còn số ví dụ: Cost/Job 0,249 USD; GM 74,9%; breakeven 72,7%; containment 82%. Giá API đã ghi ngày trong README, nhưng ô `6_Benchmarks!B3` vẫn trống. |
| 4. Kênh | Đạt về lập luận; chưa đạt trong Excel | Đã chọn đúng một kênh Sales-Led và nêu điều kiện mở rộng toàn mạng lưới. Nhưng tab `4_Channel_Fit` vẫn là SMB, ARPU 200 USD và chốt Partner-Led. |
| 5. Pain Moment và 90 ngày | Đạt về nội dung; chưa đạt trong Excel | Pain Moment đủ giờ, việc và bề mặt nhúng; kế hoạch có số và Nguyễn Hoàng Minh phụ trách. Nhưng tab `5_90Day_Plan` vẫn để trống. |
| 6. One-Pager và Evidence | Chưa đạt điều kiện nộp | One-Pager có đủ ba khối, Evidence Pack có deadline và bài phản biện đã được ghi lại. Tuy nhiên, bài test người lạ chưa thực hiện; các số trong One-Pager chưa khớp file Excel mẫu. |

### Final Checklist

| Mục kiểm tra | Kết quả | Bằng chứng hoặc việc còn thiếu |
|---|---|---|
| 1. Tab 1 đủ 5 thành phần chi phí | Chưa đạt trong file nộp | README đã có; tab Excel phải thay toàn bộ dữ liệu ví dụ bằng P-053. |
| 2. Mẫu số là job hoàn thành | Đạt về công thức và nội dung | README dùng 1.676,5 job hoàn thành. Excel mẫu cũng chia cho job hoàn thành nhưng với số ví dụ. |
| 3. Giá bán từ 3 lần Cost/Job, GM từ 60% | Đạt về nội dung | Giá sàn 0,916 USD; giá đề xuất 0,99 USD; GM 69,2%. Cần đưa đúng số vào tab `2_Pricing`. |
| 4. Breakeven containment đã đối chiếu eval | Chưa đạt hoàn toàn | Breakeven 38,5% đã tính, nhưng eval P-053 chưa chạy nên chưa có số thật để đối chiếu. |
| 5. Value Metric, Decision Note, 2 benchmark | Đạt về nội dung | Có trong README; cần chuyển vào tab 3. |
| 6. CAC, deal/AE/ngày, một kênh | Đạt về nội dung | 1.018.380 USD; 0,003 deal/ngày; Sales-Led. Cần chuyển vào tab 4. |
| 7. Plan có số, Evidence có deadline | Đạt về nội dung | Có trong README và One-Pager; cần chuyển vào tab 5. |
| 8. Có ngày kiểm tra giá API | Chưa đạt trong file nộp | Ngày 27/08/2026 đã ghi trong README; cần điền `6_Benchmarks!B3`. |
| 9. One-Pager đủ 3 khối, số khớp Excel | Chưa đạt | One-Pager đủ 3 khối, nhưng đang khớp README chứ chưa khớp Excel. |
| 10. Có ít nhất 2 prompt phản biện | Đạt | Đã ghi kết quả Cost/Job, Value Metric, Channel, Procurement, One-Pager và Price Watch. |

### Việc bắt buộc trước khi nộp

1. Điền lại 5 tab của Excel theo đúng bảng “Nội dung để điền” ở Trạm 2 đến Trạm 6 trong README; chỉ nhập ô màu vàng và không thay công thức màu xám.
2. Mở lại workbook, kiểm tra các số đầu ra phải là: Cost/Job **0,305 USD**, giá sàn **0,916 USD**, giá đề xuất **0,99 USD**, GM **69,2%**, breakeven containment **38,5%**.
3. Kiểm tra tab kênh phải hiện Enterprise, Sales-Led, ngân sách CAC **1.018.380 USD** và 0,003 deal/AE/ngày.
4. Điền ngày kiểm tra giá **27/08/2026** vào tab 6 và điền Evidence Pack, kế hoạch 90 ngày vào tab 5.
5. Sau khi Excel đã khớp, cập nhật lại One-Pager nếu có bất kỳ số đầu ra nào đổi; sau đó đưa cho một người chưa biết dự án đọc trong hai phút và ghi số câu hỏi họ hỏi lại.

Không được thay containment 50% bằng số đo thật cho đến khi chạy đủ 37 ca eval và có dữ liệu pilot. Đây là khoảng trống Evidence Pack phải giữ nguyên, không phải lỗi cần che đi.

## Kiểm tra cuối trước khi nộp LMS

**Trạng thái: chưa sẵn sàng nộp.** Lần rà cuối ngày 27/08/2026 cho thấy bài viết đã có, nhưng artefact nộp bài chưa đúng yêu cầu.

| Hạng mục nộp | Trạng thái | Cần làm trước khi nộp |
|---|---|---|
| Tên repo | Chưa đúng theo mẫu trong đề | Remote hiện là `Track1_Day25_2A202601764_NguyenHoangMinh`; đề yêu cầu `Track1_Day25_MHV_HoVaTen`. Cần xác nhận quy ước của lớp hoặc đổi tên repo trước khi nộp. |
| File Excel | Chưa đạt | File trong `inputs/` còn là template: job là “1 ticket”, containment 82%, Cost/Job 0,249 USD và kênh Partner-Led. Không phải mô hình P-053. |
| Tên Excel | Chưa đúng | Cần xuất bản hoàn chỉnh tên `NguyenHoangMinh_Day25_model.xlsx`. |
| One-Pager | Đạt dạng DOCX | Đã tạo `outputs/NguyenHoangMinh_Day25_onepager.docx`. Đề cho phép PDF hoặc DOCX; chỉ cần xuất PDF nếu LMS chặn DOCX. |
| One-Pager và Excel khớp số | Chưa đạt | One-Pager đang dùng số P-053, nhưng Excel chưa được cập nhật nên hai file không thể kiểm tra chéo. |
| Bài test người lạ | Chưa làm | Cần một người chưa biết P-053 đọc One-Pager trong 2 phút và ghi số câu họ hỏi lại, mục tiêu không quá 3. |
| Repository đã sẵn sàng gửi link | Chưa đạt | README đang sửa, `inputs/`, `outputs/` và `tools/` chưa được theo dõi bởi Git. Cần kiểm tra lại nội dung, commit và push các artefact nộp bài. |

Không nên nộp chỉ với README và file One-Pager hiện tại. Bản nộp an toàn phải gồm một Excel đã điền đúng số P-053 và One-Pager có cùng các số đó.
