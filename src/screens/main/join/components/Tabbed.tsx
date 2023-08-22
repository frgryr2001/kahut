import ButtonTab from './ButtonTab';
import PinCode from './PinCode';
import React, {useState} from 'react';
import QrCode from './QrCode';
export default function Tabbed() {
  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (tab: number) => {
    setActiveTab(tab);
  };
  return (
    <>
      {activeTab === 0 && <PinCode />}
      {activeTab === 1 && <QrCode />}

      <ButtonTab activeTab={activeTab} handleChangeTab={handleChangeTab} />
    </>
  );
}
