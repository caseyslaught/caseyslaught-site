import React from "react";
import Prismic from "prismic-javascript";

const Client = Prismic.client("https://caseyslaught.cdn.prismic.io/api/v2");

export const useExperiences = () => {
  const [experiences, setExperiences] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query(
        Prismic.Predicates.at("document.type", "experiences"),
        { orderings: "[my.experiences.start_date desc]" }
      );
      setIsLoading(false);
      if (response) {
        setExperiences(
          response.results.map((item) => ({
            id: item.id,
            title: item.data.title[0].text,
            organization: item.data.organization[0].text,
            marker_organization: item.data.marker_organization[0].text,
            organization_url: item.data.organization_link.url,
            organization_description:
              item.data.organization_description[0].text,
            location: item.data.location[0].text,
            role_description: item.data.role_description.map(
              (desc) => desc.text
            ),
            start_date: item.data.start_date,
            end_date: item.data.end_date,
            tags: [item.data.tags],
            latitude: item.data.coordinates.latitude,
            longitude: item.data.coordinates.longitude,
            image: item.data.image,
          }))
        );
      }
    };
    fetchData();
  }, []);

  return { experiences, isLoading };
};
