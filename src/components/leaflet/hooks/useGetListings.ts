import React, { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { listingsService } from 'services/ai';

export default function useGetListings(
  setListingMarkers: React.Dispatch<React.SetStateAction<any[]>>, 
  setListings: React.Dispatch<React.SetStateAction<any>>, 
  listings: any[],
  currentViewPolygon: any,
  isDraw: boolean,
  searchMlsNumber: string,
  setAllMarkers: React.Dispatch<React.SetStateAction<any[]>>,
  refetchCluster : () => void
) {
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  
  const { data, isLoading, fetchNextPage, refetch } = useInfiniteQuery(
    ['get-repliers-listings', currentViewPolygon, searchMlsNumber],
    async ({ pageParam = 1 }) => {
      const controller = new AbortController();
      setAbortController(controller);
      const response = await listingsService(pageParam, currentViewPolygon, searchMlsNumber, controller.signal); 
      return response;
    },
    {
      getNextPageParam: (lastPage) => {
        return isDraw && searchMlsNumber ? undefined : lastPage.page <= lastPage.numPages ? lastPage.page + 1 : undefined;
      },
      enabled: !!currentViewPolygon || (isDraw || !!searchMlsNumber), // Only run query if polygons or mlsNumber is present
      retry: false,
    }
  );

  useEffect(() => {
    if(data){
      if(data.pages[data.pages.length -1].numPages > 11){
        if(!!searchMlsNumber){
          const allListings = data?.pages.reduce((acc, page) => {
            return acc.concat(page.listings);
          }, []) || [];
          
          setListings(allListings);
          
          const myArray: any[] = allListings.map((item: any) => [
            Number(item?.map?.latitude), 
            Number(item?.map?.longitude), 
            '571'
          ]);
          
          setListingMarkers(myArray);
        }else{
          refetchCluster()
        }
       
      }else{
        // const newMarkers = data.pages.reduce((acc, page) => acc.concat(page.listings), []);
        // //@ts-ignore
        // setAllMarkers((prevMarkers) => {
        //     const existingMLSNumbers = prevMarkers.map(marker => marker.mlsNumber);
        //     return [...prevMarkers, ...newMarkers.filter((item : any) => !existingMLSNumbers.includes(item.mlsNumber))];
        // });
  
        // if(!!searchMlsNumber){
        //   const allListings = data?.pages.reduce((acc, page) => {
        //     return acc.concat(page.listings);
        //   }, []) || [];
          
        //   setListings(allListings);
          
        //   const myArray: any[] = allListings.map((item: any) => [
        //     Number(item?.map?.latitude), 
        //     Number(item?.map?.longitude), 
        //     '571'
        //   ]);
          
        //   setListingMarkers(myArray);
        // }else{
        // const lastData = data.pages[data.pages.length -1]
        // // if(lastData.numPages < 11){
        //   fetchNextPage()
        //   const allListings = data?.pages.reduce((acc, page) => {
        //     return acc.concat(page.listings);
        //   }, []) || [];
        //     setListings(allListings)
        //     const myArray: any[] = allListings.map((item: any) => [
        //       Number(item?.map?.latitude), 
        //       Number(item?.map?.longitude), 
        //       '571'
        //     ]);
            
        //     setListingMarkers(myArray);
         
        // } 
      }

     
   
    }
  }, [data, setListingMarkers, setListings]);  // Update markers only when data changes

  useEffect(() => {
    if (abortController) {
      abortController.abort(); // Cancel any ongoing request if mlsNumber or isDraw state changes
      setAbortController(null);
    }
  }, [isDraw, searchMlsNumber, abortController]);

  return { isLoadingListings: isLoading  , lastData : data?.pages[data?.pages.length -1] };
}