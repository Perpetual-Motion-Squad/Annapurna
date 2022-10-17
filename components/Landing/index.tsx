import Image from 'next/image'
import React from 'react'

type Props = {}

const Landing = (props: Props) => {
  return (
    <div className='text-white relative h-full'>
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='w-1/2 ml-auto mt-auto pb-10'>
                <h1 className='text-6xl font-medium font-lora'>
                    Changing the world together.
                </h1>
                <p className='text-xl py-4 font-sora font-light'>
                The Sustainable Development Goals, known as the Global Goals, is a plan to eliminate hunger, fight inequality, and clean up the planet.
                </p>
            </div>
        </div>
        <div className="w-full my-0 py-0 flex bg-[rgba(255,255,255,0.1)] text-white">
            <div className="pt-20 w-4/5 flex flex-col px-14 items-start">
                <Image width={50} height={50} src="/images/qoutecirc.svg" alt="" />
                <div className="pl-10 py-4">
                    <h2 className="text-5xl font-bold font-pop">Reach Out</h2>
                    <p className="pt-10 font-sora text-xl">
                        According to FAO estimates in &apos;The State of Food Security and
                        Nutrition in the World&apos;, 2020 report, 189.2 million people are
                        undernourished in India. By this measure, 14% of the population is
                        undernourished in India. We plan to change this. However, to tackle
                        this problem, we need support from NGOs all over the country to help
                        in distribution of food from various sources.
                    </p>
                    <div className="flex gap-2 pt-10 underline text-xl cursor-pointer items-center">
                        <Image
                            src="/images/idk.svg"
                            className=""
                            alt="Become a part"
                            width={50}
                            height={50}
                        />
                        <p className="text-xl">Become a part</p>
                    </div>
                </div>
            </div>
            <div className="w-[40%] flex rounded-tl-full">
                <Image
                    width={500}
                    height={500}
                    src="/images/hungry-kids.png"
                    className="rounded-tr-[100px] rounded-bl-[100px]"
                    alt="kids are hungry"
                />
            </div>
        </div>
        <div className="w-full flex text-white">
            <div className='w-1/2 flex justify-center items-center'>
                <Image
                    width={625}
                    height={600}
                    src="/images/earth.gif"
                    alt=""
                />
            </div>
            <div className='flex flex-col font-sora items-start justify-center w-1/2 px-5'>
                <h2 className='text-5xl font-medium font-lora font-pop'>How We Function</h2>
                <p className='pt-10 pr-10 text-xl'>
                     We at Annapurna plan to make a portal where different banquet halls, party halls, etc where a lot of food is wasted and connect them to the people who can’t even afford 2 square meals a day. We plan to minimize food wastage and connect those in need.
                </p>
            </div>
        </div>
        <div className="w-full my-0 py-10 bg-[rgba(255,255,255,0.1)] text-white">
            <div className="pt-10 w-full flex flex-col px-10">
                    <div className="px-10">
                        <h1 className="text-6xl font-medium font-pop text-white font-lora">The Number Crunch</h1>
                    </div>
                </div>
                <div className="grid grid-flow-col w-full pt-20 mb-20 font-sora">
                    <div className=" border-r border-[#9B9B9B]">
                        <h1 className="text-8xl font-bold font-pop text-[#FF5F26] text-center">189.2M</h1>
                        <p className="pt-10 font-sora text-white text-center pl-10 pr-10 text-xl">According to FAO estimates in &apos;The State of Food Security and
                            Nutrition in the World&apos;, 2020 report, 189.2 million people are
                            undernourished in India. By this measure, 14% of the population is
                            undernourished in India.</p>
                    </div>
                    <div className=" border-r border-[#9B9B9B]">
                        <h1 className="text-8xl font-bold font-pop text-[#FF5F26] text-center">3000</h1>
                        <p className="pt-10 font-sora text-white text-center pl-10 pr-10 text-xl">Children die every day from hunger. Those that survive have a high chance of living with hardships in the future.
                            We at Annapurna helps decrease this number
                            through aid in the form of food.</p>
                    </div>
                    <div className=" border-r border-[#9B9B9B]">
                        <h1 className="text-8xl font-bold font-pop text-[#FF5F26] text-center">60%</h1>
                        <p className="pt-10 font-sora text-white text-center pl-10 pr-10 text-xl">Women account for 60 percent of India’s hungry population.
                            We at Annapurna helps decrease this number
                            through aid in the form of food.
                        </p>
                    </div>
            </div>
        </div>
        <div className="pt-20 w-full flex items-center justify-center px-10">
            <div className='w-1/2 flex justify-center items-center'>
                <Image
                    width={500}
                    height={500}
                    src="/images/ETH.png"
                    alt=""
                />
            </div>
            <div className='flex flex-col font-sora items-start justify-center w-1/2 px-5'>
                <h2 className='text-5xl font-medium font-lora font-pop'>How Tokens Work</h2>
                <p className='py-10 pr-10 text-xl'>
                    The total number of slots available for a hall is published by individual halls on a daily basis. Each user has 6 Tokens in total. A user can choose to visit any location and this would cost 1 token, in exchange they get a ticket for the given slot. This way users can book slots.
                </p>
            </div>
        </div>       
    </div>
  )
}

export default Landing