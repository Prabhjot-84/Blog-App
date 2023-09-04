import './App.css';

function App() {
  return (
    <main>

      <header>
        <a href="" className="logo"> My Blogs </a>
        <nav>
          <a href=""> Login </a>
          <a href=""> Register </a>
        </nav>
      </header>

      <div className="post">
        <div className="image">
          <img src="https://images.pexels.com/photos/17502664/pexels-photo-17502664/free-photo-of-close-up-of-robot.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </div>
        <div className="texts">
          <h2> AI will destroy humans </h2>
          <p className="info">
            <span className="author"> Pj Snake </span>
            <time>04-09-2023 11:05 </time>
          </p>
          <p className="summary">Artificial Intelligence (AI) is a powerful and transformative technology that has the potential to bring significant benefits to humanity. However, like any powerful tool, it also carries certain risks and challenges that need to be carefully managed.</p>
        </div>
      </div>

      <div className="post">
        <div className="image">
          <img src="https://s3.amazonaws.com/images.productionhub.com/newsletter/custom/13b81d82-aa52-463a-b7ac-031468a19307.jpg" />
        </div>
        <div className="texts">
          <h2> Aliens invation on Earth </h2>
          <p className="info">
            <span className="author"> Pj Snake </span>
            <time>04-09-2023 11:05 </time>
          </p>
          <p className="summary"> In a fictional scenario, Earth faced an unprecedented threat from a technologically advanced alien civilization. These extraterrestrial beings, arrived in colossal spacecraft, dwarfing our largest cities. Their motive was clear: conquest and domination. </p>
        </div>
      </div>

    </main>
  );
}

export default App;
