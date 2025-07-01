'use client'

import { Timeline, Icon } from '@/components/ui'

export default function AboutPage() {
  const data = [
    {
      title: '2021',
      content: (
        <div>
          <p className="mb-8 text-3xl font-medium text-zinc-800 md:text-3xl dark:text-zinc-200 ">
            The Chinese University of Hong Kong
          </p>
          <div className="border border-zinc-800 dark:border-zinc-200"></div>
          <br />
          <ul className="ml-4">
            <li className="flex">
              <p className="min-w-[120px]">Major: </p>
              <p>Elctronic Engineering</p>
            </li>
            <li>
              <br />
            </li>
            <li className="flex">
              <p className="min-w-[120px]">Course Work:</p>
              <p>
                Digital circuit, Computing System, Electromagnetic, Signal,
                Robotic, Programming(C++, Python), Computer vision, Machine
                learning, Deep learning
              </p>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '2023 Summer',
      content: (
        <div>
          <p className="mb-8 text-3xl font-medium text-zinc-800 md:text-3xl dark:text-zinc-200 ">
            STEM Education Summer Internship
          </p>
          <div className="border border-zinc-800 dark:border-zinc-200"></div>
          <br />
          <div className="ml-4 flex">
            <p className="min-w-[120px]">Main duties: </p>
            <ul className="list-disc">
              <li>
                Provided STEM education courses to primary and secondary school
                students.
              </li>
              <li>Designed and implemented STEM Education teaching plans.</li>
              <li>
                Trained problem-solving skills by giving instant technique
                support to students&apos; ideas.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ]
  return (
    <div className="relative w-full overflow-clip mb-[10rem]">
      <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col mx-auto mt-[10vh] items-start max-w-lg p-10 relative">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
        <div className="ml-6">
          <h2 className="dark:text-white text-black text-2xl font-bold ">
            Tsoi Yu Yeung, Johnny
          </h2>
          <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
            Email: johnny.013777@gmail.com
          </p>
        </div>
        <div className="ml-6">
          <h2 className="dark:text-white text-black mt-4 text-2xl font-bold ">
            Skills
          </h2>
          <div className="flex flex-wrap">
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              Python
            </p>
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              CNN
            </p>
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              JavaScript
            </p>
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              FullStack
            </p>
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              Next.js
            </p>
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              React.js
            </p>
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              Express.js
            </p>
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              MongoDB
            </p>
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              MySQL
            </p>
            <p className="text-xl border font-normal dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 mx-1">
              PCB Design
            </p>
          </div>
        </div>
      </div>

      <Timeline data={data} />
    </div>
  )
}
