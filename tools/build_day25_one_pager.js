const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const template = path.join(root, 'inputs', 'Day25-AI-Product-GTM-One-Pager-Template.docx');
const outputDir = path.join(root, 'outputs');
const output = path.join(outputDir, 'Day25-Monetization-One-Pager-NguyenHoangMinh.docx');

const escapeXml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

function setParagraph(xml, targetIndex, text) {
  let currentIndex = -1;
  let found = false;
  const result = xml.replace(/<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g, (whole, body) => {
    currentIndex += 1;
    if (currentIndex !== targetIndex) return whole;
    found = true;
    let textReplaced = false;
    const updatedBody = body.replace(/<w:t(?:\s[^>]*)?>[\s\S]*?<\/w:t>/, (textNode) => {
      textReplaced = true;
      return textNode.replace(/>([\s\S]*?)<\//, `>${escapeXml(text)}<\/`);
    });
    if (!textReplaced) throw new Error(`Paragraph ${targetIndex} has no editable text node`);
    return whole.replace(body, updatedBody);
  });
  if (!found) throw new Error(`Paragraph ${targetIndex} was not found`);
  return result;
}

const content = new Map([
  [0, 'DAY 25 - AI-IN-ACTION - TRACK 1'],
  [2, 'Tên / Nhóm: Nguyễn Hoàng Minh / 2A202601764     Sản phẩm: P-053'],
  [3, 'Value Metric: Hybrid     Kênh: Sales-Led     Ngày: 27/08/2026'],
  [8, 'Ngân sách vận hành bán hàng của VinFast: điều phối lịch và xử lý lịch vắng mặt.'],
  [9, 'Người duyệt: đơn vị vận hành mạng lưới showroom.'],
  [12, 'Hybrid: phí nền theo showroom mỗi tháng, cộng 0,99 USD cho mỗi job vượt mức.'],
  [13, 'Attribution 4/10; Autonomy 0/10. Eval P-053 chưa chạy nên chưa bán thuần Outcome.'],
  [14, 'Phí nền trả cho DriveOps, dữ liệu lịch, phân quyền và hỗ trợ cơ bản.'],
  [17, 'Salesforce Agentforce - Usage - 0,10 USD/action - salesforce.com/agentforce/pricing'],
  [18, 'Intercom Fin - Hybrid - 49 USD/tháng gồm 50 outcomes; 0,99 USD/outcome vượt - fin.ai/pricing'],
  [24, '0,305 USD/job'],
  [27, '0,916 USD/job'],
  [30, '0,99 USD/job vượt mức'],
  [33, '69,2%'],
  [36, '38,5%'],
  [39, '50% giả định; chưa đo'],
  [41, 'Giá trần: 1,09-2,73 USD/job theo 10-25% giá trị tiết kiệm.'],
  [44, 'Một showroom tiết kiệm giả định 120 USD/tháng.'],
  [45, 'Mức job gồm sẵn chưa chốt; chưa báo giá cuối trước pilot.'],
  [48, 'Gross Margin dưới 50% khi containment thấp hơn khoảng 31%.'],
  [53, 'Sales-Led: founder bán pilot trực tiếp cho VinFast tại 3-5 showroom.'],
  [54, 'Không chọn PLG vì cần tích hợp DriveOps, phân quyền và quy trình showroom.'],
  [60, '61.346 USD/tháng'],
  [63, '1.018.380 USD/khách'],
  [66, '0,003 deal/ngày'],
  [69, '44.800 USD/khách'],
  [72, 'CAC tham chiếu thấp hơn ngân sách 22,7 lần'],
  [77, '20:00-22:00: khách xem xe, muốn đặt/đổi/hủy lịch khi showroom không phản hồi ngay.'],
  [78, 'Họ ở trang xe hoặc luồng đặt lịch trên điện thoại của VinFast.'],
  [81, 'Nút Đặt lịch lái thử với ViVi và widget chat/booking trong trang xe hoặc trang đặt lịch VinFast.'],
  [88, 'Founder-led Sales-Led'],
  [89, 'Sales-Led; họp pilot hằng tuần'],
  [90, 'Sales-Led; hợp đồng mở rộng'],
  [92, '1 VinFast; xin 3-5 showroom'],
  [93, '1 pilot; 3-5 showroom; 100 jobs'],
  [94, 'Mở từ 5 lên 20 showroom'],
  [96, 'Tiếp cận 2 đầu mối và phỏng vấn 3 quản lý showroom'],
  [97, 'Nhúng widget; ghi trạng thái từng job; rà soát hằng tuần'],
  [98, 'Chốt giá; chuẩn hóa cài đặt và chuyển ca; mở theo từng đợt 5 showroom'],
  [100, '37 ca eval có kết quả; không còn lỗi P0 ở booking công khai'],
  [101, '100 job có log; containment >=50%; retry <=8%; không có sự cố nghiêm trọng'],
  [102, 'Giữ containment >=50% tại nhóm showroom mở rộng'],
  [104, 'Nguyễn Hoàng Minh; đầu mối VinFast chưa xác định'],
  [105, 'Nguyễn Hoàng Minh; đầu mối vận hành VinFast sau khi duyệt pilot'],
  [106, 'Nguyễn Hoàng Minh; người bảo trợ VinFast trước khi mở rộng'],
  [115, 'Chưa'],
  [116, 'Chạy 37 ca eval và xuất báo cáo có task success, containment và tỷ lệ chuyển người.'],
  [117, 'Nguyễn Hoàng Minh - 26/09/2026'],
  [119, 'Có bản rà soát; chưa đạt điều kiện production'],
  [120, 'Chưa dùng production trước khi đóng lỗi P0; cần DPA, chính sách dữ liệu và kế hoạch xuất dữ liệu.'],
  [121, 'Nguyễn Hoàng Minh - 19/09/2026'],
  [123, 'Chưa'],
  [124, 'Pilot 3-5 showroom, ít nhất 100 job; báo cáo containment, thời gian xử lý và phần tiết kiệm.'],
  [125, 'Nguyễn Hoàng Minh - mục tiêu 01/10/2026, sau khi VinFast duyệt pilot'],
  [132, 'Chưa thực hiện với người lạ. Mục tiêu: không quá 3 câu hỏi lại.'],
]);

if (!fs.existsSync(template)) throw new Error(`Missing template: ${template}`);
if (fs.existsSync(output)) throw new Error(`Refusing to overwrite existing output: ${output}`);
fs.mkdirSync(outputDir, { recursive: true });

const staging = fs.mkdtempSync(path.join(os.tmpdir(), 'day25-one-pager-'));
execFileSync('unzip', ['-q', template, '-d', staging]);
const documentXml = path.join(staging, 'word', 'document.xml');
let xml = fs.readFileSync(documentXml, 'utf8');
for (const [index, text] of content) xml = setParagraph(xml, index, text);
fs.writeFileSync(documentXml, xml, 'utf8');
execFileSync('zip', ['-q', '-r', output, '.'], { cwd: staging });
console.log(output);
