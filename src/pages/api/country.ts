import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { country } = JSON.parse(req.body) as {
    country: keyof typeof tourData;
  };
  res.status(200).json(tourData[country]);
}

const tourData = {
  tokyo: [
    {
      title: "Recommended for You",
      interest: "",
      tours: {
        results: [
          {
            _id: "1",
            title: "Tokyo 1",
            coverMedia: {
              url: "https://fastly.picsum.photos/id/1070/536/354.jpg?hmac=p4brdNw_UWs81kcRjHoVFQzW_P-OFuuxUwS3Y2-2-QM",
            },
          },
          {
            _id: "2",
            title: "Tokyo 2",
            coverMedia: {
              url: "https://fastly.picsum.photos/id/1070/536/354.jpg?hmac=p4brdNw_UWs81kcRjHoVFQzW_P-OFuuxUwS3Y2-2-QM",
            },
          },
        ],
      },
    },
    {
      title: "Food and Drinks",
      interest: "",
      tours: {
        results: [
          {
            _id: "3",
            title: "Tokyo 3",
            coverMedia: {
              url: "https://fastly.picsum.photos/id/1070/536/354.jpg?hmac=p4brdNw_UWs81kcRjHoVFQzW_P-OFuuxUwS3Y2-2-QM",
            },
          },
          {
            _id: "4",
            title: "Tokyo 4",
            coverMedia: {
              url: "https://fastly.picsum.photos/id/1070/536/354.jpg?hmac=p4brdNw_UWs81kcRjHoVFQzW_P-OFuuxUwS3Y2-2-QM",
            },
          },
        ],
      },
    },
  ],
  paris: [
    {
      title: "Recommended for You",
      interest: "",
      tours: {
        results: [
          {
            _id: "1",
            title: "Paris 1",
            coverMedia: {
              url: "https://fastly.picsum.photos/id/1070/536/354.jpg?hmac=p4brdNw_UWs81kcRjHoVFQzW_P-OFuuxUwS3Y2-2-QM",
            },
          },
          {
            _id: "2",
            title: "Paris 2",
            coverMedia: {
              url: "https://fastly.picsum.photos/id/1070/536/354.jpg?hmac=p4brdNw_UWs81kcRjHoVFQzW_P-OFuuxUwS3Y2-2-QM",
            },
          },
        ],
      },
    },
    {
      title: "Museums",
      interest: "",
      tours: {
        results: [
          {
            _id: "3",
            title: "Paris 3",
            coverMedia: {
              url: "https://fastly.picsum.photos/id/1070/536/354.jpg?hmac=p4brdNw_UWs81kcRjHoVFQzW_P-OFuuxUwS3Y2-2-QM",
            },
          },
          {
            _id: "4",
            title: "Paris 4",
            coverMedia: {
              url: "https://fastly.picsum.photos/id/1070/536/354.jpg?hmac=p4brdNw_UWs81kcRjHoVFQzW_P-OFuuxUwS3Y2-2-QM",
            },
          },
        ],
      },
    },
  ],
};
