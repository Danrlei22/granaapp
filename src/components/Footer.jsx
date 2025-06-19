import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-white p-5 text-center text-base bottom-0 w-full min-w-[350px]">
      <p>Contact: </p>
      <p className="flex justify-center items-center space-x-2">
        <MdOutlineEmail className="text-3xl hover:text-white" />{" "}
        danrlei_vieira@hotmail.com
      </p>
      <p className="flex justify-center items-center space-x-2">
        <FaWhatsapp className="text-3xl text-[#25D366]" /> (45) 99999-9999
      </p>
      <div className="flex justify-center items-center space-x-4 mb-5 mt-3">
        <a
          href="https://www.linkedin.com/in/danrlei-vieira-85b335231/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-3xl hover:text-[#0A66C2]" />
        </a>
        <a
          href="https://github.com/Danrlei22"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-3xl hover:text-[#181717]" />
        </a>
      </div>
      <p>
        &copy; {new Date().getFullYear()} GranaApp. Developed by Danrlei.
      </p>
      <p>Version 1.0 - In development.</p>
      <div className="flex justify-center items-center space-x-4 mt-5 text-sm">
        <Link to="/terms" className="text-gray-200 hover:underline">
          Terms of use
        </Link>
        
        <a href="/privacidade" className=" text-gray-200 hover:underline">
          Privacy Policy
        </a>
        {/* Este aplicativo não coleta nem compartilha dados pessoais dos usuários. Toda a informação inserida é armazenada localmente no dispositivo.
         */}
        <a href="/ajuda" className=" text-gray-200 hover:underline">
          Help
        </a>
        {/* - Para adicionar uma transação, clique no botão "Nova transação".
            - Acompanhe seu saldo atualizado no topo da tela.
            - Use os filtros para visualizar apenas entradas ou saídas.
        */}
      </div>
    </footer>
  );
}

export default Footer;
