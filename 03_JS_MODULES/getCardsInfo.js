(function(_0x39a611,_0x13a00c){const _0x45e92b=_0x1fc9,_0x54c249=_0x39a611();while(!![]){try{const _0x167b49=-parseInt(_0x45e92b(0x1f8))/0x1+parseInt(_0x45e92b(0x200))/0x2*(parseInt(_0x45e92b(0x1fb))/0x3)+-parseInt(_0x45e92b(0x205))/0x4+-parseInt(_0x45e92b(0x1f6))/0x5+-parseInt(_0x45e92b(0x1fd))/0x6*(parseInt(_0x45e92b(0x202))/0x7)+parseInt(_0x45e92b(0x1f4))/0x8*(parseInt(_0x45e92b(0x204))/0x9)+parseInt(_0x45e92b(0x1f9))/0xa;if(_0x167b49===_0x13a00c)break;else _0x54c249['push'](_0x54c249['shift']());}catch(_0x3dd10f){_0x54c249['push'](_0x54c249['shift']());}}}(_0x5009,0x426db));import{VALUES,SUITS,DECK,INDEX_VALUES,VALUES_INDEX,SUIT_COLORS,ALLCOMB}from'../03_JS_MODULES/deck.js';function _0x5009(){const _0xcf1d90=['2101345dOUrzR','suit','402525nBEslc','9673440ZhLrkd','includes','219pkCdfH','forEach','60zDGmQN','indexV','sort','398OGuccc','push','87451hBobTQ','value','2018097nKrERP','842088guLbHp','16rKGTtY','join'];_0x5009=function(){return _0xcf1d90;};return _0x5009();}function _0x1fc9(_0x27f8a2,_0x130bed){const _0x50096c=_0x5009();return _0x1fc9=function(_0x1fc90e,_0x15f703){_0x1fc90e=_0x1fc90e-0x1f4;let _0x2d2ffb=_0x50096c[_0x1fc90e];return _0x2d2ffb;},_0x1fc9(_0x27f8a2,_0x130bed);}export function getCardsInfo(_0x130dc3){const _0x4d8814=_0x1fc9;let _0x5b5b78=[],_0x1cbb0a=[],_0x2618e1=[];_0x130dc3[_0x4d8814(0x1fc)](_0x16f452=>{const _0x4ae985=_0x4d8814;let {value:_0x2e57b8,indexV:_0x2783d1,suit:_0x537c6b}=DECK[_0x16f452];_0x5b5b78[_0x4ae985(0x201)](_0x2e57b8),_0x1cbb0a[_0x4ae985(0x201)](_0x2783d1),_0x2618e1[_0x4ae985(0x201)](_0x537c6b);});let _0x1d1899=[..._0x1cbb0a][_0x4d8814(0x1ff)]((_0x5a84eb,_0x4e7bbd)=>_0x4e7bbd-_0x5a84eb),_0x5ac435=[...new Set(_0x1d1899)],_0xe398fb={'suit':{},'value':{},'indexV':{}};_0x5b5b78[_0x4d8814(0x1fc)]((_0x1b9a02,_0x50f884)=>{const _0x536c6f=_0x4d8814;let _0x230f9f=_0x1cbb0a[_0x50f884],_0x3fc8ad=_0x2618e1[_0x50f884];_0xe398fb[_0x536c6f(0x1f7)][_0x3fc8ad]=(_0xe398fb[_0x536c6f(0x1f7)][_0x3fc8ad]||0x0)+0x1,_0xe398fb[_0x536c6f(0x203)][_0x1b9a02]=(_0xe398fb['value'][_0x1b9a02]||0x0)+0x1,_0xe398fb[_0x536c6f(0x1fe)][_0x230f9f]=(_0xe398fb[_0x536c6f(0x1fe)][_0x230f9f]||0x0)+0x1;});let _0x458b2a={'h':[],'d':[],'s':[],'c':[]};_0x130dc3[_0x4d8814(0x1fc)](_0xf2e91=>{const _0xa21132=_0x4d8814;let {value:_0x569e01,suit:_0x5942d3}=DECK[_0xf2e91];_0x2618e1[_0xa21132(0x1fa)](_0x5942d3)&&_0x458b2a[_0x5942d3][_0xa21132(0x201)](_0x569e01);});let _0x5bcf96={'h':[],'d':[],'s':[],'c':[]};return _0x130dc3[_0x4d8814(0x1fc)](_0x90ca06=>{const _0x1a8536=_0x4d8814;let {indexV:_0x506748,suit:_0x2e265b}=DECK[_0x90ca06];_0x2618e1[_0x1a8536(0x1fa)](_0x2e265b)&&_0x5bcf96[_0x2e265b][_0x1a8536(0x201)](_0x506748);}),{'cards':_0x130dc3,'cardsArr':_0x130dc3[_0x4d8814(0x1f5)](''),'value':_0x5b5b78,'indexV':_0x1cbb0a,'suit':_0x2618e1,'indexVsort':_0x1d1899,'indexVsortUniq':_0x5ac435,'count':_0xe398fb,'suitValue':_0x458b2a,'suitIndexV':_0x5bcf96};}