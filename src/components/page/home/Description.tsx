"use client";

import React from "react";

const Description = () => {
	return (
		<section className="flex flex-col gap-2 w-full px-2">
			<span className="font-thin text-lg text-gray-700 dark:text-gray-200">
				Chào mừng đến với SpeechConvert - nơi bạn có thể chuyển đổi giữa văn bản và giọng nói chỉ trong vài bước đơn
				giản. Với ứng dụng của chúng tôi, bạn có thể biến những đoạn văn bản thành lời nói và ngược lại một cách nhanh
				chóng và tiện lợi.
			</span>
			<div className="font-bold text-xl text-gray-700 dark:text-gray-200">Chức Năng và Tính Năng</div>
			<ul>
				<li className="font-thin text-lg text-gray-700 dark:text-gray-200">
					<span className="font-bold">Chuyển đổi Văn Bản thành Giọng Nói:</span> Nhập văn bản bạn muốn chuyển đổi và
					chọn giọng nói mà bạn muốn sử dụng, sau đó nhấn nút &quot;Chuyển đổi&quot; - và ngay lập tức, bạn sẽ có được
					một file âm thanh với giọng nói được tạo ra tự động.
				</li>
				<li className="font-thin text-lg text-gray-700 dark:text-gray-200">
					<strong>Chuyển đổi Giọng Nói thành Văn Bản:</strong> Ghi âm hoặc tải lên file âm thanh và chọn ngôn ngữ của
					bạn, sau đó nhấn nút &quot;Chuyển đổi&quot; - và bạn sẽ nhận được văn bản chính xác từ giọng nói.
				</li>
				<li className="font-thin text-lg text-gray-700 dark:text-gray-200">
					<strong>Đa Ngôn Ngữ và Giọng Đọc:</strong> Hỗ trợ nhiều ngôn ngữ và giọng đọc khác nhau, giúp bạn tùy chỉnh
					trải nghiệm chuyển đổi theo ý thích của mình.
				</li>
			</ul>
			<div className="font-bold text-xl text-gray-700 dark:text-gray-200">Đơn Giản và Dễ Dàng</div>
			<span className="font-thin text-lg text-gray-700 dark:text-gray-200">
				SpeechConvert được thiết kế để làm cho quá trình chuyển đổi giữa văn bản và giọng nói trở nên đơn giản và dễ
				dàng nhất có thể. Với giao diện thân thiện và tính năng tùy chỉnh, bạn có thể tạo ra những file âm thanh và văn
				bản chất lượng cao chỉ trong vài bước đơn giản.
			</span>
			<div className="font-bold text-xl text-gray-700 dark:text-gray-200">Sử Dụng Miễn Phí và Không Cần Đăng Ký</div>
			<span className="font-thin text-lg text-gray-700 dark:text-gray-200">
				SpeechConvert là một dịch vụ miễn phí và không yêu cầu đăng ký. Bạn có thể sử dụng các tính năng của chúng tôi
				mà không cần tạo tài khoản, giúp tiết kiệm thời gian và tạo ra trải nghiệm người dùng thuận tiện nhất cho mọi
				người.
			</span>
			<span className="font-thin text-lg text-gray-700 dark:text-gray-200">
				Hãy thử SpeechConvert ngay hôm nay và trải nghiệm sức mạnh của chuyển đổi giữa văn bản và giọng nói một cách
				nhanh chóng và dễ dàng!
			</span>
		</section>
	);
};

export default Description;
