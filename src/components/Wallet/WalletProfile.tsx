import { MappingWalletIconPath } from "@/configs/wallet.config";
import { useProvider } from "@/hooks/provider.hook";
import { useWalletStore } from "@/store/wallet/wallet.type";
import { truncateAddress } from "@/utils/formatString";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { formatEther } from "ethers/lib/utils";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function WalletProfile() {
  const { walletAddress, walletType } = useWalletStore();
  const { provider, disconnect } = useProvider();
  const [isClient, setIsClient] = useState(false);
  const [balance, setBalance] = useState("0");

  const handleSignOut = () => disconnect();
  useEffect(() => {
    const getBalance = async () => {
      if (provider) {
        const rawBalance = await provider.getBalance(walletAddress);
        const balance = formatEther(rawBalance);
        return balance;
      }
      return "0";
    };
    getBalance().then((balance) => {
      setBalance(balance);
    });
  }, [provider, walletAddress]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (isClient)
    return (
      <Dropdown>
        <DropdownTrigger>
          <div className="flex cursor-pointer">
            <div className="flex border border-[#EFEFEF] rounded-xl bg-[#F7F9F9]">
              <div className="p-3 flex items-center space-x-2">
                <Image
                  src={MappingWalletIconPath(walletType)}
                  alt="safe"
                  width={20}
                  height={20}
                />
                <p className="text-xs font-semibold">{balance}</p>
              </div>
              <div className="bg-white border boder-[#EFEFEF] rounded-xl p-3 flex items-center">
                <p className="text-xs font-semibold">
                  {truncateAddress(walletAddress)}
                </p>
              </div>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Action">
          <DropdownItem
            key="sign_out"
            className="text-danger"
            color="danger"
            onPress={() => handleSignOut()}
          >
            Disconnect
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
}