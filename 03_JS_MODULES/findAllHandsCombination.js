const _0x2f1b8f=_0x5c18;(function(_0x52a92e,_0x1eadf7){const _0x17bf3a=_0x5c18,_0x20e12c=_0x52a92e();while(!![]){try{const _0x51ff4e=parseInt(_0x17bf3a(0x108))/0x1*(parseInt(_0x17bf3a(0xd2))/0x2)+-parseInt(_0x17bf3a(0xe5))/0x3*(parseInt(_0x17bf3a(0xf6))/0x4)+-parseInt(_0x17bf3a(0xf9))/0x5+-parseInt(_0x17bf3a(0xdb))/0x6+parseInt(_0x17bf3a(0x109))/0x7+parseInt(_0x17bf3a(0xc8))/0x8+parseInt(_0x17bf3a(0xc1))/0x9;if(_0x51ff4e===_0x1eadf7)break;else _0x20e12c['push'](_0x20e12c['shift']());}catch(_0x7b82cf){_0x20e12c['push'](_0x20e12c['shift']());}}}(_0x1070,0xe5485));function _0x5c18(_0x357548,_0x40069b){const _0x1070e2=_0x1070();return _0x5c18=function(_0x5c18f3,_0x24fa60){_0x5c18f3=_0x5c18f3-0xc1;let _0x12ee6b=_0x1070e2[_0x5c18f3];return _0x12ee6b;},_0x5c18(_0x357548,_0x40069b);}import{findCombination}from'./findCombination.js';import{findFlushDraw,findStraightDraw}from'./findDraw.js';import{getCardsInfo}from'./getCardsInfo.js';import{BOARD,COMB}from'../script.js';let groupHands=[_0x2f1b8f(0xfc),'Nothing'],madeGroupHands=[_0x2f1b8f(0xea),_0x2f1b8f(0xc9)],doperPlusHands=[_0x2f1b8f(0xca),_0x2f1b8f(0xfe),_0x2f1b8f(0xf0),'Full\x20House','Flush',_0x2f1b8f(0xfa),'Set',_0x2f1b8f(0xd3),'Doper'],pairHands=[_0x2f1b8f(0xc6),_0x2f1b8f(0x100),_0x2f1b8f(0xdf),'2-nd\x20Pair',_0x2f1b8f(0xcb),'Weak\x20Pair'],nothingGroupHands=[_0x2f1b8f(0xf4),_0x2f1b8f(0xe3),_0x2f1b8f(0xc7)],possibleCombsMade=['Royal\x20Flush',_0x2f1b8f(0xfe),_0x2f1b8f(0xf0),_0x2f1b8f(0xfb),_0x2f1b8f(0x103),_0x2f1b8f(0xfa),'Set',_0x2f1b8f(0xd3),_0x2f1b8f(0xe9),'Overpair',_0x2f1b8f(0x100),_0x2f1b8f(0xdf),_0x2f1b8f(0xe1),_0x2f1b8f(0xcb),'Weak\x20Pair',_0x2f1b8f(0xf4),_0x2f1b8f(0xe3),_0x2f1b8f(0xc7)],possibleCombsFlashDraw=[_0x2f1b8f(0xe6),_0x2f1b8f(0x104),_0x2f1b8f(0xe2)],possibleCombsBDFlashDraw=[_0x2f1b8f(0xce),'BDFD\x20(1\x20card)',_0x2f1b8f(0xd4)],possibleCombsStraightDraw=[_0x2f1b8f(0xcd),_0x2f1b8f(0xd0),_0x2f1b8f(0xf5),'Gutshot\x20(2\x20card)',_0x2f1b8f(0xd9),_0x2f1b8f(0xd1),'OESD\x20???'],possibleCombsBDStraightDraw=[_0x2f1b8f(0xd8),_0x2f1b8f(0xf2),_0x2f1b8f(0xeb),_0x2f1b8f(0x107),_0x2f1b8f(0xef),'BD\x20Gutshot\x20(1\x20card)','NO\x20BDSD','BD\x20OESD\x20???','SD'],possibleDraw=[_0x2f1b8f(0xed),'FD','OESD',_0x2f1b8f(0x105),_0x2f1b8f(0xec)],possibleBD=[_0x2f1b8f(0xe7),'BD\x20FD',_0x2f1b8f(0xc4),_0x2f1b8f(0xc3)];export{groupHands,madeGroupHands,nothingGroupHands,doperPlusHands,pairHands,possibleDraw,possibleBD,possibleCombsMade,possibleCombsFlashDraw,possibleCombsBDFlashDraw,possibleCombsStraightDraw,possibleCombsBDStraightDraw};export function getfilterCombsArr(_0x3610d5,_0x21e611,_0x15be4c){const _0x4e57a5=[];return _0x3610d5['forEach'](_0x1b4f70=>{const _0x3d16b3=_0x5c18;if(_0x1b4f70[_0x3d16b3(0xf7)]('s'))_0x21e611[_0x3d16b3(0xe4)](_0x3f6e2d=>{_0x3f6e2d[0x1]===_0x3f6e2d[0x3]&&_0x3f6e2d[0x0]===_0x1b4f70[0x0]&&_0x3f6e2d[0x2]===_0x1b4f70[0x1]&&_0x4e57a5['push'](_0x3f6e2d);});else _0x1b4f70['includes']('o')?_0x21e611[_0x3d16b3(0xe4)](_0x3ef35c=>{const _0x3d77a7=_0x3d16b3;_0x3ef35c[0x1]!==_0x3ef35c[0x3]&&_0x3ef35c[0x0]===_0x1b4f70[0x0]&&_0x3ef35c[0x2]===_0x1b4f70[0x1]&&_0x4e57a5[_0x3d77a7(0xff)](_0x3ef35c);}):_0x21e611[_0x3d16b3(0xe4)](_0x2c7dda=>{_0x2c7dda[0x0]===_0x1b4f70[0x0]&&_0x2c7dda[0x2]===_0x1b4f70[0x1]&&_0x4e57a5['push'](_0x2c7dda);});}),_0x4e57a5;}export function getLivePlayerComb(_0x468ab4,_0x1d3f5e,_0x269761){const _0x4c24ba=_0x2f1b8f;let _0x469936=[],_0x413b29=[],_0x21c550=[];return _0x413b29=_0x468ab4[_0x4c24ba(0xf1)](_0x22375d=>!_0x1d3f5e[_0x4c24ba(0xde)](_0x3978e6=>_0x22375d[_0x4c24ba(0xf7)](_0x3978e6))),_0x21c550=_0x413b29[_0x4c24ba(0xf1)](_0x574fc4=>!_0x269761[_0x4c24ba(0xde)](_0x5196d1=>_0x574fc4[_0x4c24ba(0xf7)](_0x5196d1))),_0x469936=_0x21c550['map'](_0x231a20=>[_0x231a20['slice'](0x0,0x2),_0x231a20[_0x4c24ba(0xd7)](0x2)]),_0x469936;}export function getFlopDeadCombs(_0x165163,_0x9d96a){const _0x2fb3d0=_0x2f1b8f;let _0x28426e=_0x165163[_0x2fb3d0(0xf1)](_0x5635ac=>_0x9d96a['some'](_0x4cb4f3=>_0x5635ac[_0x2fb3d0(0xf7)](_0x4cb4f3)));return _0x28426e;}export function findAllFlopCombDrawBD(_0x22a807,_0x27932d){const _0x805317={};let _0x2f8a61=getCardsInfo(_0x22a807);return _0x27932d['forEach'](_0x56f459=>{const _0xfe5a66=_0x5c18;let _0x2dd56e=[..._0x56f459,..._0x22a807],_0x330b02=getCardsInfo(_0x56f459),_0x4bc042=getCardsInfo(_0x2dd56e),_0x1a1a46=findCombination(_0x330b02,_0x2f8a61,_0x4bc042),_0x37ccff=findFlushDraw(_0x330b02,_0x2f8a61,_0x4bc042),_0x151932=findStraightDraw(_0x330b02,_0x2f8a61,_0x4bc042);_0x37ccff['FD'][_0xfe5a66(0xf3)]!==_0xfe5a66(0xe2)&&_0x151932['SD']['SD_info']!==_0xfe5a66(0xd1)?_0x805317[_0x56f459]={..._0x1a1a46,'flopCD':!![],'flopFD':_0x37ccff,'flopSD':_0x151932}:_0x805317[_0x56f459]={..._0x1a1a46,'flopCD':![],'flopFD':_0x37ccff,'flopSD':_0x151932};}),_0x805317;}export function findGroupHandsAll(_0x27c443){const _0x246328=_0x2f1b8f;let _0x5b02db={},_0x4d06df=[_0x246328(0xca),_0x246328(0xfe),'Quads',_0x246328(0xfb),_0x246328(0x103),'Straight','Set','Trips',_0x246328(0xe9)],_0x14f59e=['Overpair',_0x246328(0x100),'Under\x20Pair','2-nd\x20Pair',_0x246328(0xcb),_0x246328(0xcc)],_0x196d7e=[_0x246328(0xf4),_0x246328(0xe3),_0x246328(0xc7)],_0x1370ba={},_0x569eb9={},_0x296ba6={},_0xf786cb=Object[_0x246328(0xe8)](_0x27c443)['length'];Object[_0x246328(0xfd)](_0x27c443)[_0x246328(0xe4)](([_0x3d3a00,_0x30a766])=>{const _0x18f86e=_0x246328;let _0x413376=_0x30a766['comb'][_0x18f86e(0x102)];!_0x1370ba[_0x413376]&&(_0x1370ba[_0x413376]=[]);;_0x1370ba[_0x413376][_0x18f86e(0xff)](_0x3d3a00);if(_0x413376===_0x18f86e(0xfc)){let _0xe69b91=_0x30a766['comb']['subType'];!_0x569eb9[_0xe69b91]&&(_0x569eb9[_0xe69b91]=[]);;_0x569eb9[_0xe69b91][_0x18f86e(0xff)](_0x3d3a00);}let _0x4e1149=_0x30a766[_0x18f86e(0x10a)][_0x18f86e(0x101)];!_0x296ba6[_0x4e1149]&&(_0x296ba6[_0x4e1149]=[]);;_0x296ba6[_0x4e1149]['push'](_0x3d3a00);}),Object['entries'](_0x1370ba)[_0x246328(0xe4)](([_0x234da2,_0x84a29a])=>{const _0x59f9de=_0x246328;_0x1370ba[_0x234da2]={'type':_0x234da2,'percent':(_0x84a29a[_0x59f9de(0xda)]/_0xf786cb*0x64)[_0x59f9de(0xc5)](0x2)+'%','count':_0x84a29a['length'],'combs':_0x84a29a};}),Object['entries'](_0x569eb9)['forEach'](([_0xb43746,_0x443be4])=>{const _0x4296c2=_0x246328;_0x569eb9[_0xb43746]={'type':_0xb43746,'percent':(_0x443be4[_0x4296c2(0xda)]/_0xf786cb*0x64)[_0x4296c2(0xc5)](0x2)+'%','count':_0x443be4[_0x4296c2(0xda)],'combs':_0x443be4};}),Object[_0x246328(0xfd)](_0x296ba6)[_0x246328(0xe4)](([_0x353223,_0x343c32])=>{const _0x3ec120=_0x246328;_0x296ba6[_0x353223]={'type':_0x353223,'percent':(_0x343c32[_0x3ec120(0xda)]/_0xf786cb*0x64)['toFixed'](0x2)+'%','count':_0x343c32[_0x3ec120(0xda)],'combs':_0x343c32};});let _0x3807f4=[],_0x5b2140=[],_0x3a83ba=[];return _0x4d06df[_0x246328(0xe4)](_0x4eee18=>{const _0x425c62=_0x246328;_0x296ba6[_0x4eee18]&&_0x3807f4[_0x425c62(0xff)](_0x296ba6[_0x4eee18]);}),_0x14f59e[_0x246328(0xe4)](_0x388660=>{const _0xae16dc=_0x246328;_0x296ba6[_0x388660]&&_0x5b2140[_0xae16dc(0xff)](_0x296ba6[_0x388660]);}),_0x196d7e['forEach'](_0x1704df=>{_0x296ba6[_0x1704df]&&_0x3a83ba['push'](_0x296ba6[_0x1704df]);}),_0x5b02db=_0x1370ba,_0x5b02db[_0x246328(0xfc)][_0x246328(0xd5)]=_0x569eb9,_0x5b02db[_0x246328(0xfc)][_0x246328(0xd5)][_0x246328(0xea)][_0x246328(0xd5)]=_0x3807f4,_0x5b02db[_0x246328(0xfc)][_0x246328(0xd5)]&&_0x5b02db[_0x246328(0xfc)][_0x246328(0xd5)][_0x246328(0xc9)]&&(_0x5b02db[_0x246328(0xfc)][_0x246328(0xd5)]['Pair'][_0x246328(0xd5)]=_0x5b2140),_0x5b02db[_0x246328(0xc7)][_0x246328(0xd5)]=_0x3a83ba,_0x5b02db;}export function findAllBoardCombinations(_0x21c5c1,_0x2671e7){const _0x44faf3=_0x2f1b8f,_0x1ffaf7={};for(let _0x76468d in _0x2671e7){let _0x3482e9=_0x2671e7[_0x76468d],_0x22df28=_0x3482e9[_0x44faf3(0x10a)][_0x44faf3(0x101)];!_0x1ffaf7[_0x22df28]&&(_0x1ffaf7[_0x22df28]=[]),_0x1ffaf7[_0x22df28][_0x44faf3(0xff)](_0x76468d);}for(let _0x354196 in _0x1ffaf7){let _0x49f2fa=_0x1ffaf7[_0x354196][_0x44faf3(0xda)]/Object['keys'](_0x2671e7)[_0x44faf3(0xda)]*0x64;_0x1ffaf7[_0x354196]={'type':_0x354196,'percent':_0x49f2fa['toFixed'](0x2)+'%','count':_0x1ffaf7[_0x354196][_0x44faf3(0xda)],'combs':_0x1ffaf7[_0x354196]};}let _0x30c80f=[];for(let _0x361588 of _0x21c5c1){_0x1ffaf7[_0x361588]&&_0x30c80f[_0x44faf3(0xff)](_0x1ffaf7[_0x361588]);}return _0x30c80f;}function _0x1070(){const _0x44c751=['BD\x20FD+SD','keys','Doper','DoperPlus','BD\x20DBB\x20(2\x20card)','No\x20draw','Combo\x20draw','DBB','BD\x20Gutshot\x20(2\x20card)','Quads','filter','BD\x20OESD\x20(1\x20card)','FD_info','1TH','DBB\x20(2\x20card)','2449292uyyPRE','includes','BDFD','172290RSqlFU','Straight','Full\x20House','made','entries','Straight\x20Flush','push','Top\x20Pair','rank','type','Flush','FD\x20(1\x20card)','Gutshot','SD_type','BD\x20DBB\x20(1\x20card)','2FErAEf','1777755YPriet','comb','2379780DWluME','OESD','No\x20BD','BD\x20SD','toFixed','Overpair','Nothing','1966688tNlFLW','Pair','Royal\x20Flush','3-rd\x20Pair','Weak\x20Pair','OESD\x20(2\x20card)','BDFD\x20(2\x20card)','BDFD_info','OESD\x20(1\x20card)','NO\x20SD','1379258hgxWLy','Trips','NO\x20BDFD','sub','flopSD','slice','BD\x20OESD\x20(2\x20card)','Gutshot\x20(1\x20card)','length','3345342VMinOO','SD_info','flopFD','some','Under\x20Pair','flopCD','2-nd\x20Pair','NO\x20FD','2TH','forEach','3JLwaCh','FD\x20(2\x20card)'];_0x1070=function(){return _0x44c751;};return _0x1070();}export function findAllFlashDraw(_0x43cbdb,_0x480a99){const _0x4b6ec1=_0x2f1b8f,_0x307931={};for(let _0x3b824a in _0x480a99){let _0x2c6cfc=_0x480a99[_0x3b824a],_0x2896ba=_0x2c6cfc['flopFD']['FD'][_0x4b6ec1(0xf3)];!_0x307931[_0x2896ba]&&(_0x307931[_0x2896ba]=[]),_0x307931[_0x2896ba]['push'](_0x3b824a);}for(let _0x3412ee in _0x307931){let _0x206352=_0x307931[_0x3412ee][_0x4b6ec1(0xda)]/Object['keys'](_0x480a99)['length']*0x64;_0x307931[_0x3412ee]={'type':_0x3412ee,'percent':_0x206352['toFixed'](0x2)+'%','count':_0x307931[_0x3412ee]['length'],'combs':_0x307931[_0x3412ee]};}let _0x50432e=[];for(let _0x1ef4ce of _0x43cbdb){_0x307931[_0x1ef4ce]&&_0x50432e['push'](_0x307931[_0x1ef4ce]);}return _0x50432e;}export function findAll_BDFD(_0x2ca082,_0x584231){const _0x2b915e=_0x2f1b8f,_0x2318d7={};for(let _0x2553b0 in _0x584231){let _0x4fbf28=_0x584231[_0x2553b0],_0x5b0899=_0x4fbf28[_0x2b915e(0xdd)][_0x2b915e(0xf8)][_0x2b915e(0xcf)];!_0x2318d7[_0x5b0899]&&(_0x2318d7[_0x5b0899]=[]),_0x2318d7[_0x5b0899][_0x2b915e(0xff)](_0x2553b0);}for(let _0x42f788 in _0x2318d7){let _0x67c10e=_0x2318d7[_0x42f788][_0x2b915e(0xda)]/Object['keys'](_0x584231)[_0x2b915e(0xda)]*0x64;_0x2318d7[_0x42f788]={'type':_0x42f788,'percent':_0x67c10e[_0x2b915e(0xc5)](0x2)+'%','count':_0x2318d7[_0x42f788]['length'],'combs':_0x2318d7[_0x42f788]};}let _0x187daf=[];for(let _0x35668e of _0x2ca082){_0x2318d7[_0x35668e]&&_0x187daf['push'](_0x2318d7[_0x35668e]);}return _0x187daf;}export function findAllStraightDraw(_0x31af9f,_0x95ee8a){const _0x33fbce=_0x2f1b8f,_0xab5ee0={};for(let _0x719647 in _0x95ee8a){let _0x484b22=_0x95ee8a[_0x719647],_0x65fca6=_0x484b22[_0x33fbce(0xd6)]['SD']['SD_info'];!_0xab5ee0[_0x65fca6]&&(_0xab5ee0[_0x65fca6]=[]),_0xab5ee0[_0x65fca6][_0x33fbce(0xff)](_0x719647);}for(let _0x3935c8 in _0xab5ee0){let _0x12b39a=_0xab5ee0[_0x3935c8][_0x33fbce(0xda)]/Object[_0x33fbce(0xe8)](_0x95ee8a)[_0x33fbce(0xda)]*0x64;_0xab5ee0[_0x3935c8]={'type':_0x3935c8,'percent':_0x12b39a[_0x33fbce(0xc5)](0x2)+'%','count':_0xab5ee0[_0x3935c8][_0x33fbce(0xda)],'combs':_0xab5ee0[_0x3935c8]};}let _0x3ed995=[];for(let _0x402dbc of _0x31af9f){_0xab5ee0[_0x402dbc]&&_0x3ed995[_0x33fbce(0xff)](_0xab5ee0[_0x402dbc]);}return _0x3ed995;}export function findAll_BDSD(_0x44035c,_0x16ac2b){const _0x37b6a8=_0x2f1b8f,_0x4c3fbd={};for(let _0x5c3ca5 in _0x16ac2b){let _0x26d19b=_0x16ac2b[_0x5c3ca5],_0x398eb9=_0x26d19b[_0x37b6a8(0xd6)]['BDSD']['BDSD_info'];!_0x4c3fbd[_0x398eb9]&&(_0x4c3fbd[_0x398eb9]=[]),_0x4c3fbd[_0x398eb9][_0x37b6a8(0xff)](_0x5c3ca5);}for(let _0x1b1a1a in _0x4c3fbd){let _0x141093=_0x4c3fbd[_0x1b1a1a][_0x37b6a8(0xda)]/Object[_0x37b6a8(0xe8)](_0x16ac2b)[_0x37b6a8(0xda)]*0x64;_0x4c3fbd[_0x1b1a1a]={'type':_0x1b1a1a,'percent':_0x141093['toFixed'](0x2)+'%','count':_0x4c3fbd[_0x1b1a1a][_0x37b6a8(0xda)],'combs':_0x4c3fbd[_0x1b1a1a]};}let _0x2319ba=[];for(let _0x5b7ea8 of _0x44035c){_0x4c3fbd[_0x5b7ea8]&&_0x2319ba[_0x37b6a8(0xff)](_0x4c3fbd[_0x5b7ea8]);}return _0x2319ba;}export function countAllCombination(_0x552914){const _0x136304=_0x2f1b8f;let _0xac4607=[];for(let _0x4c7fc4 in _0x552914){_0x552914[_0x4c7fc4][_0x136304(0xda)]>0x0&&_0xac4607['push'](_0x4c7fc4+':\x20'+_0x552914[_0x4c7fc4]['length']);}return _0xac4607;}export function findAll_draw_BD(_0x3d9582,_0x2f6474,_0x3683b5){const _0x347d21=_0x2f1b8f,_0x4df4fd={'made':{},'Nothing':{}};for(let _0x18bbf9 in _0x3d9582){let _0x2f8ef9='',_0x58c34c=_0x3d9582[_0x18bbf9];if(_0x58c34c[_0x347d21(0x10a)][_0x347d21(0x102)]==='Nothing'){if(_0x58c34c['flopCD']===!![])_0x2f8ef9=_0x347d21(0xed);else{if(_0x58c34c[_0x347d21(0xdd)]['FD']['FD']!==_0x347d21(0xe2))_0x2f8ef9='FD';else{if(_0x58c34c[_0x347d21(0xd6)]['SD']['SD_info']!==_0x347d21(0xd1)){if(_0x58c34c[_0x347d21(0xd6)]['SD']['SD_type']==='Gutshot')_0x2f8ef9='Gutshot';else(_0x58c34c[_0x347d21(0xd6)]['SD']['SD_type']===_0x347d21(0xc2)||_0x58c34c[_0x347d21(0xd6)]['SD'][_0x347d21(0x106)]===_0x347d21(0xee))&&(_0x2f8ef9=_0x347d21(0xc2));}else _0x2f8ef9=_0x347d21(0xec);}}!_0x4df4fd[_0x347d21(0xc7)][_0x2f8ef9]&&(_0x4df4fd['Nothing'][_0x2f8ef9]=[]),_0x4df4fd[_0x347d21(0xc7)][_0x2f8ef9][_0x347d21(0xff)](_0x18bbf9);}else{if(_0x58c34c[_0x347d21(0xe0)]===!![])_0x2f8ef9=_0x347d21(0xed);else{if(_0x58c34c['flopFD']['FD']['FD']!=='NO\x20FD')_0x2f8ef9='FD';else{if(_0x58c34c['flopSD']['SD'][_0x347d21(0xdc)]!==_0x347d21(0xd1)){if(_0x58c34c[_0x347d21(0xd6)]['SD'][_0x347d21(0x106)]===_0x347d21(0x105))_0x2f8ef9='Gutshot';else(_0x58c34c[_0x347d21(0xd6)]['SD'][_0x347d21(0x106)]===_0x347d21(0xc2)||_0x58c34c[_0x347d21(0xd6)]['SD'][_0x347d21(0x106)]===_0x347d21(0xee))&&(_0x2f8ef9='OESD');}else _0x2f8ef9=_0x347d21(0xec);}}!_0x4df4fd[_0x347d21(0xfc)][_0x2f8ef9]&&(_0x4df4fd[_0x347d21(0xfc)][_0x2f8ef9]=[]),_0x4df4fd['made'][_0x2f8ef9]['push'](_0x18bbf9);}}const _0x5d5d3c={'made':{},'Nothing':{}};for(let _0x53ad7d in _0x4df4fd['made']){let _0xbe9b9c=_0x4df4fd[_0x347d21(0xfc)][_0x53ad7d][_0x347d21(0xda)]/Object[_0x347d21(0xe8)](_0x3d9582)[_0x347d21(0xda)]*0x64;_0x5d5d3c['made'][_0x53ad7d]={'type':_0x53ad7d,'percent':_0xbe9b9c[_0x347d21(0xc5)](0x2)+'%','count':_0x4df4fd[_0x347d21(0xfc)][_0x53ad7d][_0x347d21(0xda)],'combs':_0x4df4fd['made'][_0x53ad7d]};}for(let _0x51868e in _0x4df4fd[_0x347d21(0xc7)]){let _0x3fe4f6=_0x4df4fd[_0x347d21(0xc7)][_0x51868e][_0x347d21(0xda)]/Object[_0x347d21(0xe8)](_0x3d9582)[_0x347d21(0xda)]*0x64;_0x5d5d3c[_0x347d21(0xc7)][_0x51868e]={'type':_0x51868e,'percent':_0x3fe4f6[_0x347d21(0xc5)](0x2)+'%','count':_0x4df4fd[_0x347d21(0xc7)][_0x51868e][_0x347d21(0xda)],'combs':_0x4df4fd[_0x347d21(0xc7)][_0x51868e]};}let _0x959c06=[],_0x2900b2=[];return _0x2f6474[_0x347d21(0xe4)](_0xdeac71=>{const _0x30fe9b=_0x347d21;_0x5d5d3c[_0x30fe9b(0xfc)][_0xdeac71]&&_0x959c06[_0x30fe9b(0xff)](_0x5d5d3c['made'][_0xdeac71]);}),_0x2f6474[_0x347d21(0xe4)](_0x119973=>{const _0x40a8e4=_0x347d21;_0x5d5d3c[_0x40a8e4(0xc7)][_0x119973]&&_0x2900b2[_0x40a8e4(0xff)](_0x5d5d3c[_0x40a8e4(0xc7)][_0x119973]);}),{'made':_0x959c06,'Nothing':_0x2900b2};}
