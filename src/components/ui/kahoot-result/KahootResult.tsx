import {View, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {PlayDetail} from '../../../types/play.type';
import KahootReportBox from './KahootReportBox';
import KahootYourPoint from './KahootYourPoint';
import KahootReportList from './KahootReportList';
import Tabbed from './Tabbed';
import KahootLeaderBoard from './KahootLeaderBoard';

export default function KahootResult({
  data,
  hasAssign,
}: {
  data: PlayDetail;
  hasAssign: boolean;
}) {
  const [activeTab, setActiveTab] = React.useState(0);
  const handleSetActiveTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <View>
      <Tabbed>
        <Tabbed.ActionContainer hideTab={!hasAssign}>
          <Tabbed.Tab
            active={activeTab === 0}
            handleSetActiveTab={handleSetActiveTab.bind(null, 0)}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#fff',
                fontSize: 16,
              }}>
              Answers
            </Text>
          </Tabbed.Tab>
          <Tabbed.Tab
            active={activeTab === 1}
            handleSetActiveTab={handleSetActiveTab.bind(null, 1)}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#fff',
                fontSize: 16,
              }}>
              Leaderboard
            </Text>
          </Tabbed.Tab>
        </Tabbed.ActionContainer>

        <Tabbed.TabContent>
          {data ? (
            <KahootReportBox>
              {activeTab === 0 && (
                <>
                  <KahootYourPoint point={data.point} />
                  <KahootReportList answers={data.answers} />
                </>
              )}
              {activeTab === 1 && (
                <KahootLeaderBoard top5LeaderBoard={data.topPlayers} />
              )}
            </KahootReportBox>
          ) : (
            <View style={{padding: 16, flex: 1, backgroundColor: '#20065c'}}>
              <ActivityIndicator color="#fff" size={40} />
            </View>
          )}
        </Tabbed.TabContent>
      </Tabbed>
    </View>
  );
}
