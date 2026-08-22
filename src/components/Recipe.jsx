import ChefRobot from "../assets/nervous_robot_chef_head.png";
import ReactMarkdown from "react-markdown";

function Recipe({ recipe }) {
  const markdownComponents = {
    h1: ({ children }) => <h3>{children}</h3>,
    h2: ({ children }) => <h3>{children}</h3>,
    h3: ({ children }) => <h4>{children}</h4>,
    h4: ({ children }) => <h5>{children}</h5>,
  };
  return (
    <section className="recipe-container">
      <h2>
        <img className="robot-icon" src={ChefRobot} alt="" />
        Chef Nervous Robot Recommends:
      </h2>
      <ReactMarkdown
        skipHtml
        allowedElements={[
          "h1",
          "h2",
          "h3",
          "h4",
          "p",
          "ul",
          "ol",
          "li",
          "strong",
          "em",
          "code",
          "pre",
          "blockquote",
          "hr",
        ]}
        unwrapDisallowed
        components={markdownComponents}
      >
        {recipe}
      </ReactMarkdown>
      <p className="advice">Don't panic!</p>
    </section>
  );
}

export default Recipe;
