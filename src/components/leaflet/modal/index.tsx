import { Anchor, Col, Modal, Row } from 'antd'
import House from 'assets/images/house/5c261_1.jpg'
import House3 from 'assets/images/house/3.jpg'
import House4 from 'assets/images/house/5.jpg'
import { FaSquareParking } from 'react-icons/fa6'
import { MdBathroom, MdBedroomParent } from 'react-icons/md'
import LoadingBar from 'react-top-loading-bar'
import ImageGallery from "react-image-gallery";
import { PhotoProvider, PhotoView } from 'react-photo-view'
import classNames from 'classnames'
import { ArrowsOutSimple, Bathtub, Bed, BookmarkSimple, Car, ChatTeardropDots, MapPin, ShareNetwork } from '@phosphor-icons/react'
import moment from 'moment'
import TextArea from 'antd/es/input/TextArea'
import LocationMap from 'components/locationMap'
import { useEffect, useState } from 'react'
import useGetDetailModal from '../hooks/useGetDetails'
interface IProps {
    open: boolean
    onHide: () => void
    selectedMarker : any
}
export default function DetailModal({ open, onHide , selectedMarker }: IProps) {
    const [mlsNumber , setMlsNumber] = useState<string>("")
    const [location, setLocation] = useState<any>()
    const [isSaved , setIsSaved] = useState<boolean>(false)
    const [savedLocations , setSavedLocations] = useState<any[] | undefined >(JSON.parse(localStorage.getItem('items')!))
   useEffect(() => {
    if(savedLocations && savedLocations.length > 0 && selectedMarker){
        setMlsNumber(selectedMarker.mlsNumber)

        const find = savedLocations.find((item : any) => item.mlsNumber === selectedMarker.mlsNumber)
        if(find){
            setIsSaved(true)
        }else{
            setIsSaved(false)
        }
    }else{
        setIsSaved(false)
    }
    return () => setIsSaved(false)
   } , [selectedMarker , savedLocations])

   const {modalData  ,isLoading} = useGetDetailModal(mlsNumber)
    
    
    return (
        <Modal
            centered
            open={open}
            okText=""
            cancelText=""
            onCancel={onHide}
            footer=""
            width={1000}
        
        >
            {modalData && (
                <>
                <div className=' flex'>
                <a target="_blank" href={`${window.location.pathname}/detail/${modalData?.mlsNumber}/${modalData.map.latitude}/${modalData.map.longitude}`} className=' hover:text-[#080606]'>
                <ArrowsOutSimple className=' border border-[#b3b3b3] rounded-md cursor-pointer mx-1' size={32} />

                </a>
                <div>
  <BookmarkSimple className={classNames(' border border-[#b3b3b3] rounded-md cursor-pointer mx-1' , isSaved ?  " text-primary" : "")} size={32} 
            onClick={() => {
                if(savedLocations){
                  
                    if(isSaved ){
                       
                        const locations = savedLocations.filter(item => item.mlsNumber !== selectedMarker.mlsNumber)
                        localStorage.setItem("items" , JSON.stringify(locations))
                        // setIsSaved(true)
                        setSavedLocations(locations)
                        setIsSaved(false)
                    }else{
                       
                        // setIsSaved(false)
                        const locations = [...savedLocations , modalData]
                        localStorage.setItem("items" , JSON.stringify(locations))
                        setSavedLocations(locations)
                        setIsSaved(true)
                    }
                }else{
                    
                    const locations = [modalData]
                    localStorage.setItem("items" , JSON.stringify(locations))
                    // setIsSaved(true)
                    setSavedLocations(locations)
                    setIsSaved(true)
                }
                
            }}  />
                </div>
          
            <ShareNetwork className=' border border-[#b3b3b3] rounded-md cursor-pointer mx-1' size={32} onClick={() => {
              if(navigator.share){
                navigator.share({

                    title: `stateSage Properties`,
                    text: "",
                    url: `${window.location.pathname}/detail/${modalData?.mlsNumber}/${modalData.map.latitude}/${modalData.map.longitude}`,
                  })
              }
                
            }} />
            </div>
                </>
            )}




           
            {modalData ? 
            <div className=" flex flex-col mt-6">
            <div className=" grid grid-cols-8 gap-2 h-[300px] w-full overflow-x-hidden ">
                <div className="col-span-4 h-[300px]">
                    <div className=" relative ">
                        <img
                            src={`https://cdn.repliers.io/${modalData.images[0]}?class=large`}
                            alt="house"
                            className=" rounded-lg w-full h-[300px] "
                        />
                        <span className=" bg-[#F4F9F8] absolute top-5 left-5 text-[#4B8179] px-2 py-1 rounded-xl border border-[#DCEBE7]">
                            For {selectedMarker.type}
                        </span>
                    </div>
                </div>
                <div className=" col-span-2  h-[300px] flex flex-col overflow-x-hidden">
                    {modalData.images.slice(1, 3).map((item : any) => (
                        <img
                            src={`https://cdn.repliers.io/${item}?class=small`}
                            alt="house"
                            className=" rounded-lg   grow h-[120px] my-1   "
                        />
                    ))}
                </div>
                <div className=" col-span-2  h-[300px] flex flex-col overflow-x-hidden">
                    {modalData.images.slice(4, 5).map((item : any) => (
                        <img
                            src={`https://cdn.repliers.io/${item}?class=small`}
                            alt="house"
                            className=" rounded-lg   grow h-[120px] my-1   "
                        />
                    ))}
                     <PhotoProvider>
                   {modalData.images.map((item: any , index : number) => (              
                        <PhotoView key={index}  src={`https://cdn.repliers.io/${item}?class=large`}>
                         
                          <img
                                src={`https://cdn.repliers.io/${item}?class=small`}
                                alt="house"
                                className={classNames(index === 6 ? " rounded-lg   grow h-[120px] my-1 opacity-25 hover:opacity-100 cursor-pointer  " : " hidden")}
                            />
                            
                        </PhotoView>     
                   ))}
                    </PhotoProvider>
                </div>
            </div>  
            
<Row className=' mt-4'>
    <Col span={16}>

    <div className=" my-3 flex w-full items-center">
                            <MapPin size={22} />
                            <p className=" text-xl mx-2">
                                {modalData.address.area} , {modalData.address.district} ,
                                {modalData.address.state} ,{' '}
                                {modalData.address.majorIntersection} ,{' '}
                                {modalData.address.neighborhood}
                            </p>
                        </div>
    <div className="my-3 flex w-full items-center">
                            <p className=" text-[#7F7C77] border-r border-[#DCEBE7] px-4">
                                Status change:{' '}
                                {moment(new Date(modalData.updatedOn)).fromNow()}
                            </p>
                            <p className=" text-[#7F7C77] px-4">
                                Updated on:{' '}
                                {moment(new Date(modalData.updatedOn)).format(
                                    'YYYY-MM-DD'
                                )}
                            </p>
                        </div>
                        <hr className=' mx-2 text-[rgba(179,179,179,.3)]' />
                        <div className=" flex justify-between  mt-4 mx-4">
                            <div className=' flex items-center text-[#595653]'>
                                <Bed className=" mx-2" size={50} />
                                <p className=' text-2xl'>{modalData.details.numBedrooms ? modalData.details.numBedrooms : 0}</p>
                            </div>

                            <div className=' flex items-center items-center text-[#595653]'>
                                <Car className=" mx-2" size={50} />
                                <p className=' text-2xl'>{modalData.details.numGarageSpaces ? modalData.details.numGarageSpaces : 0 }</p>
                            </div>

                            <div className=' flex items-center items-center text-[#595653]'>
                                <Bathtub className=" mx-2" size={50} />
                                <p className=' text-2xl'>{modalData.details.numBathrooms ? modalData.details.numBathrooms  : 0 }</p>
                            </div>
                        </div>
                        <div
                        id="Description"
                        className=" text-xl text-[#4B8179] mt-4 mx-4"
                    >
                        {' '}
                        Description
                        <p className=" my-4 bg-[#FAFCE9] w-full rounded-md text-[#595653] text-sm p-4">
                            {modalData.details.description}
                        </p>
                    </div>




                    <div className=" mt-6 border border-[#DCEBE7] mx-8">
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Tax
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {/* @ts-ignore */}$
                                    {modalData.taxes.annualAmount}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Building Age
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {/* @ts-ignore */}
                                    {modalData.taxes.assessmentYear}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Property Type
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {modalData.details.propertyType}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Type of Dwelling
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    One Level
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Maintenance
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Amenities
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Year Built
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {modalData.details.yearBuilt}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Direction
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Size
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Foundation Type
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {modalData.details.foundationType}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Basement
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {modalData.details.basement1}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Exterior
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {modalData.details.exteriorConstruction1}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Floor Covering
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]"></div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3"></div>
                            </div>
                        </div>
<div className=' mx-4 mt-4'>
<LocationMap
                                center={{
                                    lat: Number(modalData.map.latitude),
                                    lng: Number(modalData.map.longitude),
                                }}
                                selectLocation={setLocation}
                                height='200px'
                            />
</div>
                      


    </Col>
    <Col span={8}>
    <div className="border border-[#DCEBE7] rounded-lg p-3 fixed">
                        <div className="flex justify-between">
                            <h2 className="text-primary text-xl">
                                ${Number(modalData.listPrice).toLocaleString()}
                            </h2>
                            <span className="bg-[#F4F9F8] text-[#4B8179] px-2 py-1 rounded-xl border border-[#DCEBE7]">
                                For {modalData.type}
                            </span>
                        </div>
                        <hr className="text-[#DCEBE7] my-2 w-full" />
                        <p className="text-[#6B6863]">
                            Contact Estatesage consultants
                        </p>
                        <TextArea rows={4} />
                        <button className="bg-primary rounded-lg py-2 mt-2 w-full text-white">
                            <div className="flex items-center justify-center">
                                <ChatTeardropDots size={20} />
                                Submit request
                            </div>
                        </button>
                    </div>
                    
    </Col>
</Row>

              
            </div> : <LoadingBar />
        }
        
      
            
        </Modal>
    )
}