import { useQuery } from "react-query"
import { DetailModalService } from "services/ai"

export default function useGetDetailModal(selectedMarker : any) {
    const { data , isLoading } = useQuery(
        ['get-detail-in-detail-page-modal', selectedMarker],
        DetailModalService
    )
    return { modalData : data , isLoading }
}