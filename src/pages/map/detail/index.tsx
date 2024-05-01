import House from 'assets/images/house/pexels-expect-best-323780.jpg'
import House1 from 'assets/images/house/2.jpg'
import House2 from 'assets/images/house/3.jpg'
import House3 from 'assets/images/house/4.jpg'
import House4 from 'assets/images/house/5.jpg'
export default function Detail() {
    return (
        <div className=" h-screen w-screen">
            <div className=" flex  my-2">
                <img
                    src={House}
                    alt="house"
                    className=" h-[50%] w-[50%] mx-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                />
                <div className="grid grid-cols-2 gap-6">
                    <img
                        src={House1}
                        alt="house"
                        className="  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-56 w-full"
                    />
                    <img
                        src={House2}
                        alt="house"
                        className="  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-56 w-full"
                    />
                    <img
                        src={House3}
                        alt="house"
                        className="  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-56 w-full"
                    />
                    <img
                        src={House4}
                        alt="house"
                        className="  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-56 w-full"
                    />
                </div>
            </div>
        </div>
    )
}
