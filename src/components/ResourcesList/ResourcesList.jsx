import "./ResourcesList.scss";
import useApiJson from "../../hooks/apiJson.hook";
import { data } from "../../data/data";
import ResourceCard from "../ResourceCard/ResourceCard";
import { useEffect, useState } from "react";

const ResourcesList = ({ language }) => {
  const ApiJson = useApiJson();
  const [newCategory, setCategory] = useState([]);

  const uploadCategory = async () => {
    const category = await ApiJson.getCategory(language, "resources");
    setCategory(category.data);
  };

  useEffect(() => {
    uploadCategory();
  }, [language]);

  return (
    <>
      <h1 className='resources-title'>My precious... resources</h1>

      <div className='resources-container'>
        {newCategory.map((item, index) => {
          return (
            <div className='resource' key={`${JSON.stringify(item)}-${index}`}>
              <ResourceCard resource={item} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ResourcesList;
