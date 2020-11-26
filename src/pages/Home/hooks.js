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
        console.log(response.results);
        setExperiences(
          response.results.map(({ id, data }) => ({
            id,
            title: data.title[0].text,
            organization: data.organization[0].text,
            marker_organization: data.marker_organization[0].text,
            organization_url: data.organization_link.url,
            organization_description: data.organization_description[0].text,
            location: data.location[0].text,
            role_description: data.role_description.map((desc) => desc.text),
            start_date: data.start_date,
            end_date: data.end_date,
            tags: data.tags.map((tag) => tag.text),
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
            image: data.image,
          }))
        );
      }
    };
    fetchData();
  }, []);

  return { experiences, isLoading };
};
