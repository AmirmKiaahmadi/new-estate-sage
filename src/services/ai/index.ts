import request from '../axios'
// http://ec2-15-157-68-30.ca-central-1.compute.amazonaws.com:8000/app/search/
// export const aiService = async (payload: any) => {
//     const { data }: { data: any } = await request.post(
//         `http://ec2-15-157-68-30.ca-central-1.compute.amazonaws.com:8000/app/search/`,
//         {
//             q: payload,
//             'access-token': '942793b6-5384-4f61-b5ab-339a08756ecc',
//         }
//     )
//     return data
// }
export const aiService = async (payload1: any) => {
    const payload = JSON.stringify([
        {
            mlsNumber: 'C8391984',
            latitude: 43.6693452,
            longitude: -79.3821906,
        },
    ])
    const { data }: { data: any } = await request.post(
        `http://ec2-15-157-68-30.ca-central-1.compute.amazonaws.com:8000/app/id_search/`,
        {
            data: payload,
        }
    )
    return data
}
// https://cdn.repliers.io/IMG-C8391984_1.jpg?class=small
