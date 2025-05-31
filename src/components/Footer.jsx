import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-primary text-white p-5 text-center text-base bottom-0 fixed w-full">
      <p>Contantos: </p>
      <p className="flex justify-center items-center space-x-2">
        <MdOutlineEmail className="text-3xl hover:text-white" />{" "}
        danrlei_vieira@hotmail.com
      </p>
      <p className="flex justify-center items-center space-x-2">
        <FaWhatsapp className="text-3xl hover:text-[#25D366]" /> (45) 99999-9999
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
        &copy; {new Date().getFullYear()} GranaApp. Desenvolvido por Danrlei.
      </p>
      <p>Versão 1.0 - Em desenvolvimento.</p>
      <div className="flex justify-center items-center space-x-4 mt-5 text-sm">
        <a href="/termos" className="text-gray-200">
          Termos de uso
        </a>
        {/* Este aplicativo é fornecido "como está", sem garantias. O usuário é responsável pelas informações inseridas e decisões tomadas com base nelas.
         */}
        <a href="/privacidade" className=" text-gray-200">
          Política de privacidade
        </a>
        {/* Este aplicativo não coleta nem compartilha dados pessoais dos usuários. Toda a informação inserida é armazenada localmente no dispositivo.
         */}
        <a href="/ajuda" className=" text-gray-200">
          Ajuda
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
