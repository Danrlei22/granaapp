function About() {
  return (
    <div className="about">
      <h1 className="text-center font-bold text-4xl my-4">About</h1>
      <p className="text-center text-2xl px-8 leading-relaxed md:px-16 mb-8">
        <strong>GranaApp</strong> is a web application developed to help users
        manage their personal finances in a simple, intuitive and efficient way.
        With it, it is possible to record money inflows and outflows, categorize
        each transaction, track the updated balance and view graphs that make it
        easier to understand your financial habits.
        <br /> <br />
        This project was developed as part of my personal portfolio and to train
        the use of <strong>Redux</strong> and <strong>Tailwind CSS</strong> in
        conjunction with <strong>React</strong>. The API is simulated with JSON
        Server, allowing complete CRUD operations (create, read, update and
        delete transactions).
        <br /> <br />
        The main objective of GranaApp is to offer a practical solution for
        those who want to better organize their expenses and have more financial
        awareness in their daily lives. In the future, it is planned to add user
        authentication, data export and integration with real banks via Open
        Finance.
      </p>
    </div>
  );
}

export default About;
