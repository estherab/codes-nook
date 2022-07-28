import "./ResourceCard.scss";

const ResourceCard = ({ resource }) => {
  return (
    <>
      <h2>{resource.title}</h2>
      <h3>{resource.tag}</h3>
      <h4>{resource.description}</h4>
      <a className='link-post' href={resource.link} alt={resource.link}>
        Read More
      </a>
    </>
  );
};

export default ResourceCard;
