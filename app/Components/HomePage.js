"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Loader, useGLTF } from "@react-three/drei";
import Navbar from "../Components/Navbar";
import Image from "next/image";

const values = [
  {
    title: "Natural Farming",
    description: "Embrace sustainable practices that nourish the earth while producing wholesome, nutrient-rich food. Our expert support helps you grow your business and contribute to a healthier planet.",
    imgSrc: "/images/Farm.jpg",
    altText: "Graphic representing Application Support",
  },
  {
    title: "Non Toxic",
    description: "Our unwavering commitment to quality means you can trust that our products are free from harmful chemicals. We prioritize your health and satisfaction, ensuring every bite is both safe and delicious.",
    imgSrc: "/images/NonToxic.png",
    altText: "Graphic representing Customer Satisfaction",
  },
];



const Model = () => {
  const { scene } = useGLTF("/Models/scene.gltf");

  scene.scale.set(0.5, 0.5, 0.5);

  useFrame(() => {
    scene.rotation.y += 0.0005;
  });

  return <primitive object={scene} />;
};

const HomePage = () => {
  const controlsRef = useRef(null);
  const controlsAnimation = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPercent =
        scrollY / (document.body.scrollHeight - window.innerHeight);
      controlsAnimation.start({ opacity: 1 - scrollPercent });
    };
  
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };
  
    // Add the event listener when the component mounts
    window.addEventListener("scroll", throttledScroll);
  
    // Remove the event listener when the component unmounts
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [controlsAnimation]);
  

  return (
    <>
      <div>
        <Navbar />
        <div className="relative h-screen bg-black text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <Canvas camera={{ position: [20, 30, 15], fov: 25 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 5, 10]} />
              <Model />
              <OrbitControls ref={controlsRef} />
            </Canvas>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-8">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Eat Healthy, Stay Healthy!
            </motion.h1>

            <motion.p
              className="text-md sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              aria-live="polite"
            >
              Join us for an exciting journey for an adventure.
            </motion.p>
          </div>

          <div className="absolute bottom-0 left-0 w-full text-center p-4 sm:p-8 bg-black bg-opacity-70">
            <motion.div
              className="relative mx-auto w-full max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  What's Our Mission?
                </h2>
                <p>
                  Our mission is to provide you with the best quality food and
                  services to help you stay healthy and fit. We are committed to
                  providing you with the best experience possible.
                </p>
              </div>
            </motion.div>
          </div>

          <Loader />
        </div>
      </div>

<section className="p-4 sm:p-8 bg-white text-black">
  <motion.h1
    className="text-2xl sm:text-3xl md:text-4xl font-light mb-10 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1 }}
  >
    Our Values
  </motion.h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {values.map((value, index) => (
    <motion.div
      key={index}
      className="flex flex-col items-center bg-white rounded-lg p-12 shadow-lg transition-transform duration-300 hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      style={{ minHeight: '500px' }} // Increase card size
    >
      <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden"> 
        <Image
          src={value.imgSrc}
          alt={value.altText}
          fill
          style={{ objectFit: 'cover' }} // Keep object fit as 'cover' for proper cropping
          className="max-h-full max-w-full"
        />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">{value.title}</h2>
      <p className="text-sm sm:text-base text-center">{value.description}</p>
    </motion.div>
  ))}
</div>


  {/* Team Work Section */}
  <div className="flex justify-center items-center w-full mt-10">
    <motion.div
      className="w-full max-w-2xl text-center bg-white rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="relative w-full h-60 mb-4 rounded-lg overflow-hidden">
        <Image
          src="/images/Extracts.png"
          alt="Team Work"
          fill
          style={{ objectFit: 'cover' }}
          className="max-h-full max-w-full"
        />
      </div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 text-black">Traditional Extracts</h2>
      <p className="text-sm sm:text-base text-black">
      Discover the essence of tradition with our pure honey and cold-pressed oils. Sourced from the finest ingredients, our honey offers a natural sweetness, while our oils enrich your dishes with flavor and health benefits. Experience quality you can taste!

      </p>
    </motion.div>
  </div>
</section>

    </>
  );
};

export default HomePage;
