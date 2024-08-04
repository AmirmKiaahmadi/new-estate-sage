import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { listingsService } from 'services/ai';

export default function useGetListings(
  setListingMarkers: React.Dispatch<React.SetStateAction<any[]>>, 
  setListings: React.Dispatch<React.SetStateAction<any>>, 
  listings: any[],
  currentViewPolygon: any,
  isDraw: boolean,
  searchMlsNumber: string
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
        return isDraw && searchMlsNumber ? undefined : lastPage.page <= 10 ? lastPage.page + 1 : undefined;
      },
      enabled: !!currentViewPolygon || (isDraw || !!searchMlsNumber), // Only run query if polygons or mlsNumber is present
      retry: false,
    }
  );

  useEffect(() => {
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

  }, [data, setListingMarkers, setListings]);  // Update markers only when data changes

  useEffect(() => {
    if (abortController) {
      abortController.abort(); // Cancel any ongoing request if mlsNumber or isDraw state changes
      setAbortController(null);
    }
  }, [isDraw, searchMlsNumber, abortController]);

  return { isLoadingListings: isLoading };
}