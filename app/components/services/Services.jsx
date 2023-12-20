import Image from "next/image"

const Services = () => {

    const services = [
        { id: 1, icon: "/paint.svg", header: "DESIGN", text: "Embark on a visual journey where creativity meets functionality. Our meticulous design process brings your vision to life, ensuring a captivating and user-friendly interface that leaves a lasting impression." },
        { id: 2, icon: "/hammer.svg", header: "DEVELOP", text: "Transforming ideas into interactive realities, our developers employ cutting-edge technologies to build robust, scalable, and bespoke websites. Whether it's a sleek portfolio or a dynamic e-commerce platform, we craft solutions tailored to your unique needs." },
        { id: 3, icon: "/host.svg", header: "HOST", text: "Experience the pinnacle of reliability with our secure and high-performance hosting services. Your website deserves a home that guarantees speed, uptime, and top-notch security. We provide the infrastructure that ensures your online presence thrives." },
        { id: 4, icon: "/db.svg", header: "MAINTAIN", text: "Your digital success is an ongoing commitment. Focus on your business while we handle the technical intricacies, ensuring your website remains at the forefront of innovation." },
    ]
  return (
    <section id='services' className='bg-black mt-[240px] pb-40'>
        <div className='flex flex-col items-center w-[80%] m-auto'>
            <h2 className='text-[#fee302]'>Our Services</h2>
            <div className='flex flex-col lg:flex-row'>
                {services.map((service) => (
                    <div key={service.id} className='flex flex-col gap-1 p-2 my-4'>
                        <div>
                            <Image 
                            src={service.icon}
                            width={40}
                            height={40}
                            alt=""
                            />
                        </div>
                        <h3 className="text-white text-[28px]">{service.header}</h3>
                        <p className="text-white max-w-[300px]">{service.text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Services
