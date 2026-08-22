import ChefRobot from "../assets/nervous_robot_chef_head.png";

function Header() {
  return (
    <header>
      <div>
        <img className="site-icon" src={ChefRobot} alt="" />
        <h1 className="header-title">Chef Nervous Robot</h1>
      </div>
      <p className="header-tagline">
        Recipes from what you’ve got. Deep breaths.
      </p>
    </header>
  );
}

export default Header;
