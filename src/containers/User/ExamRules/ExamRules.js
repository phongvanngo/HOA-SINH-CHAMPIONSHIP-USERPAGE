import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import "./ExamRules.scss";

export default function ExamRules() {
    return (
        <div className="exam-rules-container" style={{ maxWidth: '700px', margin: 'auto' }}>
            <Card style={{ marginBottom: '10px' }}>
                <Card.Header>
                    CÁCH ĐĂNG NHẬP LÀM BÀI THI
                </Card.Header>
                <Card.Body>
                    <p style={{}}>Trong khung giờ của ca thi đã đăng kí, bạn có thể vào bất cứ lúc nào để hoàn thành bài thi của minh theo bảng đơn/bảng đội. Lưu ý rằng, đúng giờ kết thúc ca thi, bài thi sẽ tự động nộp dù thời gian làm bài thi vẫn còn.</p>
                    <p style={{}}>Đối với các thiết bị di động như điện thoại, máy tính bảng hoặc ipad, thí sinh mở link dẫn đến web thi bằng trình duyệt.</p>
                    <ul>
                        <li style={{ lineHeight: 2 }}><strong>Bước 1</strong>: Kiểm tra email, thông tin thí sinh và lấy mã code dự thi</li>
                        <li style={{ lineHeight: 2 }}><strong>Bước 2</strong>: Dán mã code thi vào khung đăng nhập trên web và kiểm tra thông tin thí sinh thi đã chính xác chưa.</li>
                        <li style={{ lineHeight: 2 }}><strong>Bước 3:</strong> Đặt tên đội thi (đối với bảng đội).</li>
                        <li style={{ lineHeight: 2 }}><strong>Bước 4:</strong> Click vào ô “Làm bài” và bắt đầu phần thi.</li>
                        <li style={{ lineHeight: 2 }}><strong>Bước 5:</strong> Hoàn thanh các câu hỏi của bài thi trong thời gian qui định.</li>
                        <li style={{ lineHeight: 2 }}><strong>Bước 6:&nbsp;</strong>Bấm “Nộp bài” khi đã hoàn thành bài thi.</li>
                    </ul>
                </Card.Body>
            </Card>
            <Card style={{ marginBottom: '10px' }}>
                <Card.Header>
                    CÁC LƯU Ý KHI LÀM BÀI THI
                </Card.Header>
                <Card.Body>
                    <p style={{}}>Số lượng câu hỏi là 40 câu. Kiến thức sẽ bao gồm tất cả các lĩnh vực của Hóa Sinh.</p>
                    <p style={{ marginBottom: '10px !important' }}>Thời lượng: 14 phút (bảng đội) và 18 phút (bảng đơn). Hết ca thi, bài thi sẽ được tự động nộp bài dù thời gian thi vẫn còn. Trong khi thi, các thao tác thoát khỏi trang web thi hoặc trình duyệt thi vẫn sẽ được tính trong thời gian làm bài của thí sinh và tự động nộp bài khi hết thời gian.</p>
                    <p style={{ marginBottom: '10px !important' }}>Kết quả thi sẽ không được hiển thị sau khi thí sinh nộp bài, sau khi kết thúc mỗi ca thi kết quả thi sẽ được tự động cập nhật lên “BẢNG XẾP HẠNG” theo bảng thi và khu vực. Các bạn thí sinh nhớ quay lại theo dõi kết quả của mình nhé.</p>
                    <p style={{ marginBottom: '10px !important' }}><strong style={{ fontWeight: 700 }}><em>Nhắc lại các ca thi:</em></strong></p>
                    <ul>
                        <li style={{ lineHeight: 2 }}>Ca 1: 6:00 – 11:00</li>
                        <li style={{ lineHeight: 2 }}>Ca 2: 14:00 – 18:00</li>
                        <li style={{ lineHeight: 2 }}>Ca 3: 19:00 – 23:59</li>
                    </ul>
                </Card.Body>
            </Card>
            <Card style={{ marginBottom: '10px' }}>
                <Card.Header>
                    CÁCH XỬ LÝ LỖI KHI LÀM BÀI THI
                </Card.Header>
                <Card.Body>
                    <p style={{}}><span style={{}}>Trong quá trình các thí sinh làm bài thi, sẽ khó tránh khỏi một số trục trặc, để đảm bảo quyền lợi cho thí sinh tham gia thi, bất cứ khi nào các bạn gặp sự cố trong quá trinh làm bài thi như đã liệt kê dưới đây, hãy nhanh chóng liên hệ cho chúng mình qua fanpage Hóa Sinh Championship hoặc qua email:&nbsp;</span><a href="mailto:hoasinhchampionship.ump@gmail.com"><span style={{}}>hoasinhchampionship.ump@gmail.com</span></a><span style={{}}>&nbsp;để được xử lí kịp thời nhé.</span></p>
                    <div style={{}}>
                        <p><span style={{}}><strong><em>Lỗi hệ thống thi</em></strong></span></p>
                    </div>
                    <ul>
                        <li style={{ marginTop: '0in', marginRight: '0in', marginBottom: '8pt', lineHeight: '107%' }}><span style={{}}>Out khỏi hệ thống thi đột ngột&nbsp;</span></li>
                        <li style={{ marginTop: '0in', marginRight: '0in', marginBottom: '8pt', lineHeight: '107%' }}><span style={{}}>Đã nộp bài nhưng hệ thống ghi nhận là “chưa nộp”</span></li>
                        <li style={{ marginTop: '0in', marginRight: '0in', marginBottom: '8pt', lineHeight: '107%' }}><span style={{}}>Lỗi hiển thi câu hỏi hay đáp án</span></li>
                        <li style={{ marginTop: '0in', marginRight: '0in', marginBottom: '8pt', lineHeight: '107%' }}><span style={{}}>Lỗi không đăng nhập thi được bằng mã code</span></li>
                    </ul>
                    <p style={{}}><span style={{}}>Khi gặp các lỗi nghĩ do hệ thống thi, các thí sinh hãy chụp màn hình những gì đã xảy ra để làm bằng chứng, chúng minh sẽ xem xét và sắp xếp một ca thi khác cho các bạn.</span></p>
                    <div style={{}}>
                        <p><span style={{}}><strong><em>Lỗi bất khả thi</em></strong></span></p>
                    </div>
                    <ul>
                        <li style={{ marginTop: '0in', marginRight: '0in', marginBottom: '8pt', lineHeight: '107%' }}><span style={{}}>Thí sinh đang làm bài thi nhưng gặp phải tình trạng rớt mạng hoặc cúp điện</span></li>
                        <li style={{ marginTop: '0in', marginRight: '0in', marginBottom: '8pt', lineHeight: '107%' }}><span style={{}}>Trường hợp này chúng mình cũng sẽ xem xét xử lí, &nbsp;nhưng biện pháp tốt nhất là các bạn lưu lại bằng chứng nhé, chúng minh sẽ căn cứ dựa trên đó và quyết định.</span></li>
                    </ul>
                    <p style={{}}><span style={{}}>Ngoài những lỗi nêu trên, các lỗi khách quan do thí sinh phạm phải khi không đọc kĩ hướng dẫn sử dụng web, chúng minh rất tiếc nhưng sẽ không thể giải quyết được cho các bạn. Vậy nên các bạn thí sinh hãy lưu ý đọc kĩ các hướng dẫn có trên fanpage và trang web cuộc thi nhé!</span></p>
                </Card.Body>
            </Card>
        </div>
    )
}
