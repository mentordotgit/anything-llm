import { useEffect, useState } from "react";
import Sidebar, { SidebarMobileHeader } from "@/components/SettingsSidebar";
import { isMobile } from "react-device-detect";
import * as Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CodeBlock } from "@phosphor-icons/react";
import EmbedRow from "./EmbedRow";
import NewEmbedModal from "./NewEmbedModal";
import { useModal } from "@/hooks/useModal";
import ModalWrapper from "@/components/ModalWrapper";
import Embed from "@/models/embed";

export default function EmbedConfigs() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="w-screen h-screen overflow-hidden bg-sidebar flex">
      {!isMobile && <Sidebar />}
      <div
        style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
        className="transition-all duration-500 relative md:ml-[2px] md:mr-[16px] md:my-[16px] md:rounded-[26px] bg-main-gradient w-full h-full overflow-y-scroll border-4 border-accent"
      >
        {isMobile && <SidebarMobileHeader />}
        <div className="flex flex-col w-full px-1 md:px-20 md:py-12 py-16">
          <div className="w-full flex flex-col gap-y-1 pb-6 border-white border-b-2 border-opacity-10">
            <div className="items-center flex gap-x-4">
              <p className="text-2xl font-semibold text-white">
                Embeddable Chat Widgets
              </p>
              <button
                onClick={openModal}
                className="border border-slate-200 px-4 py-1 rounded-lg text-slate-200 text-sm items-center flex gap-x-2 hover:bg-slate-200 hover:text-slate-800"
              >
                <CodeBlock className="h-4 w-4" /> Create embed
              </button>
            </div>
            <p className="text-sm font-base text-white text-opacity-60">
              Embeddable chat widgets are public facing chat interfaces that are
              tied to a single workspace. These allow you to build workspaces
              that then you can publish to the world.
            </p>
          </div>
          <EmbedContainer />
        </div>
        <ModalWrapper isOpen={isOpen}>
          <NewEmbedModal closeModal={closeModal} />
        </ModalWrapper>
      </div>
    </div>
  );
}

function EmbedContainer() {
  const [loading, setLoading] = useState(true);
  const [embeds, setEmbeds] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const _embeds = await Embed.embeds();
      setEmbeds(_embeds);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Skeleton.default
        height="80vh"
        width="100%"
        highlightColor="#3D4147"
        baseColor="#2C2F35"
        count={1}
        className="w-full p-4 rounded-b-2xl rounded-tr-2xl rounded-tl-sm mt-6"
        containerClassName="flex w-full"
      />
    );
  }

  return (
    <table className="md:w-3/4 w-full text-sm text-left rounded-lg mt-5">
      <thead className="text-white text-opacity-80 text-sm font-bold uppercase border-white border-b border-opacity-60">
        <tr>
          <th scope="col" className="px-6 py-3 rounded-tl-lg">
            Workspace
          </th>
          <th scope="col" className="px-6 py-3">
            Sent Chats
          </th>
          <th scope="col" className="px-6 py-3">
            Active Domains
          </th>
          <th scope="col" className="px-6 py-3 rounded-tr-lg">
            {" "}
          </th>
        </tr>
      </thead>
      <tbody>
        {embeds.map((embed) => (
          <EmbedRow key={embed.id} embed={embed} />
        ))}
      </tbody>
    </table>
  );
}
