"use client";
import axios from "axios";

import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";

import { useEffect, useState } from "react";
interface HeroImageProps {
	url: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ url }) => {
	const [images, setImages] = useState<string[]>([]);

	async function fetchImages() {
		// const url =
		// 	"https://api.unsplash.com/search/photos? page=1&query=vaccation&client_id=6TgHjsUuXsvgkOzFv0PA3WHOTlUnTELOLIyxJ5Q0WXw";
		console.log(url);

		try {
			const response = await axios.get(url);
			const data = await response.data.results;

			let imgUrl: string[] = [];

			data.map((img: any) => imgUrl.push(img.urls.full));

			if (imgUrl.length) {
				setImages(imgUrl);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchImages();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className=" bg-slate-700 h-[45vh] w-[45vw] rounded-md border-none relative shadow-lg">
			<Fade>
				{images.map((image, index) => (
					<div key={index}>
						<div
							className="flex items-center justify-center h-[45vh] w-[45vw] bg-center bg-no-repeat bg-cover rounded-md"
							style={{ backgroundImage: `url(${image})` }}
						></div>
					</div>
				))}
			</Fade>
		</div>
	);
};

// export default HeroImage;
