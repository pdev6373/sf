import { useState } from 'react';
import EditInput from '../components/EditInput';
import Select from '../components/Select';
import { BiExpand, BiCollapse } from 'react-icons/bi';



const WorkItem = ({ color, title, subtitle, reason }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ backgroundColor: color || '#CAD9FF' }} className="py-4">
      <div className="flex items-center justify-between h-[59px] px-4">
        <div>
          <div className="text-sm font-bold">{title}</div>
          <div className="text-sm ">{subtitle}</div>
        </div>
        <button onClick={() => setExpanded(!expanded)}>
          {!expanded ? <BiExpand size={24} /> : <BiCollapse size={24} />}
        </button>
      </div>
      <div
        className={`${
          !expanded ? 'h-0 py-0 overflow-hidden opacity-0' : 'h-auto py-4 opacity-100'
        } transition-all duration-300 transform px-4`}
      >
        {reason}
      </div>
    </div>
  );
};

const WorkingTime = () => {
  const [amDays, setAmDays] = useState([]);
  const [pmDays, setPmDays] = useState([]);

  return (
    <>
      <div className="mb-5">
        <div className="text-2xl">Working Time</div>
      </div>
      <div className="w-full grid grid-cols-3 gap-x-8">
        <div className="bg-white rounded py-7 px-5">
          <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
            <div className="text-lg">Custom Working Week </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="font-semibold text-lg mb-4">Set a custom week</p>
              <div className="text-sm">
                Set a custom working week to calculate the amount of days your security tag is
                primarily active. Part time members may set specific days instead of all. Tick the
                weeks you are usually at work and want your tag active.
              </div>
            </div>
            <div>
              <div className="grid grid-cols-8 gap-x-4">
                <div></div>
                {['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'].map((d) => (
                  <div className="font-semibold text-center text-sm">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-8 gap-x-4">
                <div className="font-semibold text-center text-sm flex flex-col justify-center">
                  AM
                </div>
                {['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'].map((d) => (
                  <div className="font-semibold text-center text-sm p-1 bg-[#F6F6F9] h-[39px] flex flex-col justify-center">
                    <input
                      type="checkbox"
                      className="h-[20px] w-full p-0 outline-none border-none bg-transparent"
                      checked={amDays.includes(d)}
                      onChange={() =>
                        !amDays.includes(d)
                          ? setAmDays([...amDays, d])
                          : setAmDays(amDays.filter((a) => a !== d))
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-8 gap-x-4 mt-4">
                <div className="font-semibold text-center text-sm flex flex-col justify-center">
                  PM
                </div>
                {['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'].map((d) => (
                  <div className="font-semibold text-center text-sm p-1 bg-[#F6F6F9] h-[39px] flex flex-col justify-center">
                    <input
                      type="checkbox"
                      className="h-[20px] w-full p-0 outline-none border-none bg-transparent"
                      checked={pmDays.includes(d)}
                      onChange={() =>
                        !pmDays.includes(d)
                          ? setPmDays([...pmDays, d])
                          : setPmDays(pmDays.filter((a) => a !== d))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <p className="text-lg font-semibold">Start Date</p>
              <EditInput type="date" />
            </div>
            <div className="">
              <p className="text-lg font-semibold">End Date</p>
              <EditInput type="date" />
            </div>
            <div>
              <button className="h-12 bg-primary text-white w-full rounded">UPDATE</button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded py-7 px-5">
          <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
            <div className="text-lg">Time Off </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="font-semibold text-lg mb-4">Book Days Off</p>
              <div className="text-sm">
                Log in your days you are off to ensure your security tag is inactive on those days.
                Only log in time off days for days you are expected to be at work or holidays that
                fall on those days.
              </div>
            </div>
            <div className="">
              <p className="text-lg font-semibold">Reason</p>
              <Select data={[{ title: 'Option One', value: 'Option One' }]} />
            </div>
            <div className="">
              <p className="text-lg font-semibold">Start Date</p>
              <EditInput type="date" />
            </div>
            <div>
              <p className="text-lg font-semibold">End Date</p>
              <EditInput type="date" />
            </div>
            <div className="flex-1 flex flex-col ">
              <p className="text-lg font-semibold">Add Note (Optional)</p>
              <div className="bg-[#F6F6F9] h-[110px]">
                <textarea
                  placeholder="Share more detail on why you are away "
                  className="w-full border-transparent focus:border-transparent focus:ring-0 h-full bg-transparent border-none outline-none! text-sm"
                ></textarea>
              </div>
            </div>
            <div>
              <button className="h-12 bg-primary text-white w-full rounded">SAVE</button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded py-7 px-5">
          <div className="flex items-center justify-between pb-4 border-b-[#C4C2C2] border-b-[0.25px] mb-6">
            <div className="text-lg">Work TIme Chart</div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <div className="h-[74px] bg-[#0B7723] flex flex-col justify-center text-white text-2xl px-6">
                You are at work today
              </div>
              <div className="h-[74px] bg-danger flex flex-col justify-center text-white text-2xl px-6">
                You are away today
              </div>
              <p className="text-lg mt-7 mb-2">When Next Are You Away</p>
              <p className="text-sm">No upcoming days off logged</p>
              <p className="text-lg mt-2 mb-5">Days you were away</p>
            </div>
            {[0, 1, 2].map((o) => (
              <WorkItem
                key={o}
                title="Thursday 4 Nov 2023 - Monday 6 Nov 2023"
                subtitle="Sick Leave"
                reason="I recently started visitations to the hospital to help with my eye procedures and would require these two days off for final checkup.  "
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingTime;
