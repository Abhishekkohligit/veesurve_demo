"use client";

import { NavbarHome } from "@/app/_components/navbar-home";

import { Button } from "@/app/components/ui/button";
import { InputS } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { ImWhatsapp } from "react-icons/im";

import { FormEvent, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
	const router = useRouter();
	const [nameInput, setNameInput] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [phoneInput, setPhoneInput] = useState(0);
	const [messageInput, setMessageInput] = useState("");

	const [loading, setLoading] = useState(false);

	useEffect(() => emailjs.init("ZLHwm2yp3LLR7jdVw"), []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const serviceId = "service_zdu7tg3";
		const templateId = "template_cjfne2b";
		try {
			setLoading(true);
			await emailjs.send(serviceId!, templateId!, {
				name: nameInput,
				email: emailInput,
				phone: phoneInput,
				message: messageInput,
			});
			alert("email successfully sent, We'll get back to you soon ");
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	// console.log(nameInput);
	return (
		<>
			<div className="h-full w-full p-5 bg-gray-100 flex flex-col gap-4 items-center mt-[110px]">
				{/* navbar */}
				<NavbarHome />

				<div
					id="container"
					className=" w-full h-full  flex gap-2  items-center flex-col flex-1"
				>
					<h1 className="font-extrabold text-lg">Contact Us</h1>
					<div
						id="wrapper"
						className="flex flex-col md:flex-row gap-2 w-full px-1"
					>
						<div
							id="left"
							className=" w-full md:w-3/4 p-3 flex flex-col rounded-md border"
						>
							{/* <h1 className="font-semibold">Drop us a Line!</h1> */}
							<form id="formContainer" onSubmit={handleSubmit} className="pb-1">
								<div id="elemContainer" className="flex flex-col gap-1">
									<label htmlFor="">Name</label>
									<InputS
										onChange={(e) => setNameInput(e.target.value)}
										type="text"
										placeholder="Please enter your name"
									/>
								</div>
								<div id="elemContainer" className="flex flex-col gap-1">
									<label htmlFor="">Email</label>
									<InputS
										onChange={(e) => setEmailInput(e.target.value)}
										type="email"
										placeholder="Please enter your Email"
									/>
								</div>
								<div id="elemContainer" className="flex flex-col gap-1">
									<label htmlFor="">Phone</label>
									<InputS
										onChange={(e) => setPhoneInput(Number(e.target.value))}
										type="tel"
										pattern="[0-9]{10}"
										maxLength={10}
										placeholder="Please enter your Phone"
									/>
								</div>
								<div id="elemContainer" className="flex flex-col gap-1">
									<label htmlFor="">Message</label>
									<Textarea
										placeholder="Type your message here"
										id="message"
										onChange={(e) => setMessageInput(e.target.value)}
									/>
								</div>
								<Button
									className="w-full mt-3 group border hover:border-neutral-900 rounded-full font-semibold text-md hover:bg-neutral-100 bg-neutral-900 text-white border-white p-2"
									disabled={loading}
									type="submit"
									form="formContainer"
								>
									<p className="mr-2 group-hover:text-neutral-900 text-white">
										Send Message
									</p>
									<BsFillSendFill className="group-hover:animate-ping group-hover:text-neutral-900 transition text-white" />
								</Button>
							</form>
						</div>
						<div
							id="right"
							className="w-full md:w-1/4 p-3 flex flex-col gap-3 border rounded-lg"
						>
							<div className="flex flex-col gap-4 ">
								<p>
									Better yet, see us in person!. We love our customers, so feel
									free to contact us to schedule an appointment
								</p>
								<div>
									<p>
										<span className="underline mr-2">Phone:</span>
										+91-9667525599
									</p>
								</div>
								<div>
									<p>
										<span className="underline mr-2">Email: </span>
										<a
											href="mailto:experiences@veesurve.com?subject=Email from your Website&body=Let's connect via email"
											className="bg-neutral-500 rounded-sm text-neutral-100"
										>
											experiences@veesurve.com <br /> (or click on the link)
										</a>
									</p>
								</div>
								<div>
									<p>
										<span className="underline mr-2">Address:</span>
										<span>
											Civitech Sampriti, Sector-77,
											<br /> Noida (Delhi NCR), UP-201301
										</span>
									</p>
								</div>
								<div className="flex flex-row justify-center items-center gap-1">
									<Button
										className="group border hover:border-neutral-900 rounded-full font-semibold text-md hover:bg-neutral-100 bg-neutral-900 text-white border-white p-[1vw]
									text-[1vw]
									sm:text-sm sm:text-wrap
									"
									>
										<ImWhatsapp
											size={20}
											className="group-hover:animate-bounce transition group-hover:text-neutral-900 bg-[#44C554] rounded-full"
										/>
										<a
											href="https://wa.me/919667525599"
											target="_blank"
											className="ml-2 group-hover:text-neutral-900"
										>
											Message us on Whatsapp
										</a>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className=" font-extrabold">
					To Explore our other services please Click on the below link
				</div>
				<div>
					<div className="flex flex-col items-center justify-center gap-1">
						<Button
							onClick={() => router.push("/holidays")}
							className="group border hover:border-neutral-900 rounded-full font-semibold text-md hover:bg-neutral-100 bg-neutral-900 text-white border-white p-2"
							size="default"
							variant="outline"
						>
							<p className="mr-2">Explore Holidays</p>

							<FaArrowAltCircleRight
								size={25}
								className="group-hover:animate-spin transition  "
							/>
						</Button>
						<Button
							onClick={() => router.push("/events")}
							className="group border hover:border-neutral-900 rounded-full font-semibold text-md hover:bg-neutral-100 bg-neutral-900 text-white border-white p-2"
							size="default"
							variant="outline"
						>
							<FaArrowAltCircleLeft
								size={25}
								className="group-hover:animate-spin transition  "
							/>
							<p className="ml-2">Explore Events</p>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactPage;
