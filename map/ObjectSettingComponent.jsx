import React, { useState, useEffect, useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';
import {
  faAngleRight,
  faAngleLeft,
  faEraser,
  faTimesCircle,
  faStreetView,
  faDoorOpen,
  faUsers,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';
import { CurrentSelectObjectContext, useSetOptions, useObjectSearch, useSlider } from '../contexts/CurrentSelectObject';
import { CurrentObjectCategoryContext, useFurnDecoFunc, useFlaskFunc } from '../contexts/CurrentObjectCategory';
import { useCurrentObjectCategory, useRightClick, useEscKey } from '../contexts/useContextEvent';
import {
  selectTileEffect,
  setSpawnInput,
  setPersonalInput,
  selectObject,
  setObjectMessage,
  setObjectUrl,
  setObjectPassword,
  setCursorMode,
  addEven,
  eventNames,
  allTileEffectVisible,
  setTextObject,
  canvasState,
} from '../services/CanvasService';

import env from '../environments';
import FAIcon from '../FAIcon';
import PortalModal from '../components/modal/PortalModal';
import { TileEffectInputContext } from '../contexts/TileEffectInput';
import { MapInfoContext, useClickCursorMenu } from '../contexts/MapInfo';
import { uploadImage } from '../utils/axios';
import ObjectSettingModal from 'components/modal/ObjectSettingModal';
import { getViewPort } from 'views/ContentComponent';

const PreviousArrow = props => {
  return (
    <PreviousArrowWrap className={props.className} style={{ ...props.style }} onClick={props.onClick}>
      <FAIcon icon={faAngleLeft} size="2x" />
    </PreviousArrowWrap>
  );
};

const NextArrow = props => {
  return (
    <NextArrowWrap className={props.className} style={{ ...props.style }} onClick={props.onClick}>
      <FAIcon icon={faAngleRight} size="2x" />
    </NextArrowWrap>
  );
};

const isEmpty = object => {
  return Object.keys(object).length === 0 ? true : false;
};

const ObjectSettingComponent = () => {
  const { currentObjectCategory, onClickObjectCategory, setEraserSelectMenuVisible } = useContext(CurrentObjectCategoryContext);
  const { spawnTileEffectInput, onChangeSpawnInput, personalTileEffectInput, onChangePersonalInput } =
    useContext(TileEffectInputContext);
  const {
    advancedOption,
    changeAdvancedOption,
    currentRoom,
    beforeRoomName,
    TileActiveHandle,
    cursorIcon: { cursorCheck },
  } = useContext(MapInfoContext);

  const { isObjOptionChangeFurnDeco } = useFurnDecoFunc();
  const { isObjOptionChangeFlask } = useFlaskFunc();
  const { isRightClick } = useRightClick();

  const { currentSelectObject } = useContext(CurrentSelectObjectContext);
  const { offClickSide } = useCurrentObjectCategory();
  const [objSettingModalVisible, setObjSettingModalVisible] = useState(false);
  const [objSettingText, setObjSettingText] = useState('');
  const [tab, setTab] = useState({ advance: false, tileEffect: true });
  const [selectedTileEffect, setSelectTileEffect] = useState(null);
  const [portalModalVisible, setPortalModalVisible] = useState(false);
  const { sliderIndex, setSliderIndex, objectColorChangeSetSlider } = useSlider();
  const [advancedOptionFilePath, setAdvancedOptionFilePath] = useState('');
  const [checkbox, setCheckBox] = useState('tab');
  const [tempFile, setTempFile] = useState();
  const sliderRef = useRef();
  const newTabRef = useRef();
  const urlRef = useRef();
  const msgRef = useRef();
  const passwordRef = useRef();
  const textRef = useRef();

  const [uploadImagePosition, setUploadImagePosition] = useState('10');

  const { message, setMessage, url, setUrl, password, setPassword, text, setText } = useSetOptions();
  const { setEscPressKey } = useEscKey();
  const { objectSearch } = useObjectSearch();

  const [isUserImage, setIsUserImage] = useState(false);
  const { activeCursorMode } = useClickCursorMenu();

  const regUrlCheck = /(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,;]+[.]+[a-zA-Z]+([.]+[a-zA-Z]+)?/gi;
  const regPasswordCheck = /^[A-Za-z0-9+]{0,10}$/;

  const settings = {
    dots: false,
    width: 1000,
    infinite: false,
    adaptiveHeight: true,
    autoPlay: false,
    swipeToSlide: true,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    afterChange: current => {
      setSliderIndex(current ?? 0);
      selectObject(
        currentSelectObject.info.images[current].id,
        currentSelectObject.info.images[current].path,
        currentObjectCategory,
        true,
      );
    },
  };
  useEffect(() => {
    if (currentSelectObject) {
      setIsUserImage(/^[0-9]+$/.test(currentSelectObject?.info.name));
    }
  }, [currentSelectObject]);

  function setTimeCountAndVisible(text, seconds = 1500) {
    setObjSettingModalVisible(true);
    setObjSettingText(text);
    setTimeout(() => {
      setObjSettingModalVisible(false);
    }, seconds);
  }

  const tabCheck = object => {
    if (object.objectOptions.tab === 'new_tab') {
      if (newTabRef != null) {
        if (newTabRef.current) newTabRef.current.checked = true;
      }
    } else {
      if (newTabRef != null) {
        if (newTabRef.current) newTabRef.current.checked = false;
      }
    }
  };

  // 오브젝트 옵션 수정
  useEffect(() => {
    addEven(eventNames.selectedObject, object => {
      if (!object.objectOptions) return;
      setEscPressKey(true);
      onClickObjectCategory(object.type, true);
      objectSearch(object); // Slider
      if (object.type === 'furniture' || object.type === 'decoration') {
        setMessage(object.objectOptions?.message === '' ? null : object.objectOptions.message);
        setUrl(object.objectOptions?.url === '' ? null : object.objectOptions.url);
      } else if (object.type === 'flask') {
        setMessage(object.objectOptions?.flask.hint_msg === '' ? null : object.objectOptions.flask.hint_msg);
        setUrl(object.objectOptions?.flask.hint_url === '' ? null : object.objectOptions.flask.hint_url);
        setPassword(object.objectOptions?.flask.password === '' ? null : object.objectOptions.flask.password);
      }
      tabCheck(object);
    });
  }, []);

  // 룸체인지 => 컴포넌트 메뉴 초기화
  useEffect(() => {
    if (currentRoom.id !== beforeRoomName.id) {
      onClickObjectCategory(null);
    }
  }, [currentRoom.id]);

  //
  const advancedOptionsInputClick = () => {
    canvasState.isClickAdvanceOptions = true;
    setEraserSelectMenuVisible(false);
  };

  const changeOption = async key => {
    canvasState.isClickAdvanceOptions = false;
    switch (key) {
      case 'hint':
        let hintValue = urlRef?.current?.value;
        if (!hintValue.trim()) {
          setTimeCountAndVisible('힌트를 입력해주세요.');
        } else {
          setCheckBox('tab');
          setObjectUrl(hintValue, checkbox);
          changeAdvancedOption(key, hintValue);
          setTimeCountAndVisible('입력이 완료되었습니다.');
        }
        break;
      case 'url':
        let urlValue = urlRef?.current?.value;
        if (urlRef.current.value.substring(0, 8) !== 'https://') {
          urlValue = 'https://' + urlRef.current.value;
        }
        if (urlValue.includes('http://')) {
          urlValue = urlValue.replace('https://', ' ').trim();
        }
        if (regUrlCheck.test(urlValue ?? urlRef.current.value)) {
          if (newTabRef?.current?.checked === false) {
            setCheckBox('tab');
          }
          changeAdvancedOption(key, urlValue);
          setObjectUrl(urlValue, checkbox);
          setTimeCountAndVisible('입력이 완료되었습니다.');
        } else {
          setTimeCountAndVisible('URL이 올바르지 않습니다.', 3000);
        }
        break;
      case 'message':
        let msgValue = msgRef?.current?.value;
        if (!msgValue.trim()) {
          setTimeCountAndVisible('메시지를 입력해주세요.');
        } else {
          changeAdvancedOption(key, msgValue);
          setObjectMessage(msgValue);
          setTimeCountAndVisible('입력이 완료되었습니다.');
        }
        break;
      case 'image':
        if (!tempFile) {
          setTimeCountAndVisible('파일을 업로드해주세요.');
        } else {
          if (tempFile.name.length > 13) {
            setTimeCountAndVisible('이름은 최대 13자리 입니다.');
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            const uploadObjImgae = new Image();
            uploadObjImgae.src = reader.result;
            uploadObjImgae.onload = async function () {
              if (Number(this.width) > env.ImageLimit || Number(this.height) > env.ImageLimit) {
                setTimeCountAndVisible('4096px 초과할 수 없습니다.');
              } else {
                setCursorMode(env.cursorMode.stamp);
                activeCursorMode([null, () => {}]);
                cursorCheck(env.cursorMode.basic);
                changeAdvancedOption('image', tempFile);
                const image = await uploadImage(
                  tempFile,
                  reader,
                  advancedOption.message,
                  advancedOption.url,
                  advancedOption.url_tab,
                  uploadImagePosition,
                );
                if (image) {
                  setTimeCountAndVisible('업로드가 완료되었습니다.');
                  setUploadImagePosition(position => (position = '10'));
                } else {
                  setTimeCountAndVisible('업로드 실패');
                }
              }
            };
          };
          reader.readAsDataURL(tempFile);
        }
        break;
      case 'password':
        let passwordValue = passwordRef?.current?.value;
        if (!passwordValue.trim()) {
          setTimeCountAndVisible('비밀번호를 입력해주세요.');
          return;
        }
        if (regPasswordCheck.test(passwordValue)) {
          if (passwordValue.includes('+')) {
            setTimeCountAndVisible('입력이 올바르지 않습니다.', 3000);
            return;
          }
          setObjectPassword(passwordValue);
          changeAdvancedOption('password', passwordValue);
          setTimeCountAndVisible('입력이 완료되었습니다.');
        } else {
          setTimeCountAndVisible('입력이 올바르지 않습니다.', 3000);
        }
        break;
      case 'text':
        let textValue = textRef?.current?.value;
        if (!textValue.trim()) {
          setTimeCountAndVisible('텍스트를 입력해주세요.');
        } else if (textValue.length > 20) {
          setTimeCountAndVisible('최대 20자 입력가능합니다.');
        } else {
          changeAdvancedOption('text', textValue);
          setTextObject(textValue);
          setCursorMode(env.cursorMode.stamp);
          cursorCheck(env.cursorMode.basic);
          activeCursorMode([null, () => {}]);
          setTimeCountAndVisible('입력이 완료되었습니다.');
        }
        break;
      default:
        break;
    }
  };

  const checkBoxHandle = e => {
    const target = newTabRef?.current?.checked;
    if (target) {
      setCheckBox(newTabRef?.current?.id);
    } else {
      setCheckBox('tab');
    }
  };

  const onTabClick = key => {
    if (key === env.tab.advance) {
      setTab({ advance: true, tileEffect: false });

      return;
    }

    setTab({ advance: false, tileEffect: true });
  };

  const onTileEffectClick = (e, type) => {
    e.preventDefault();
    canvasState.isClickAdvanceOptions = false;
    activeCursorMode([null, () => {}]);

    if (type === env.cursorMode.eraser) {
      cursorCheck(env.cursorMode.eraser);
    } else {
      cursorCheck(env.cursorMode.basic);
    }
    setEraserSelectMenuVisible(false);
    selectTileEffect(type);

    if (selectedTileEffect === type) {
      setSelectTileEffect(null);
      return;
    }

    setSelectTileEffect(type);
  };

  const onClosePortalModal = () => {
    setPortalModalVisible(false);
  };

  useEffect(() => {
    setAdvancedOptionFilePath('');
    if (sliderRef.current != null) {
      if (currentObjectCategory !== 'floor' && currentObjectCategory !== 'wall') sliderRef.current.slickGoTo(sliderIndex);
    }

    if (currentSelectObject && currentSelectObject.currentObj) {
      const index = currentSelectObject?.info?.images?.findIndex(image => image.id === currentSelectObject.currentObj.id);
      setSliderIndex(index !== -1 ? index : 0);
    }
  }, [currentSelectObject]);

  useEffect(() => {
    if (currentObjectCategory === 'wall' || currentObjectCategory === 'floor' || currentObjectCategory === null) {
      onTabClick(env.tab.tileEffect);
      return;
    }

    onTabClick(env.tab.advance);
    if (newTabRef.current != null) newTabRef.current.checked = false;
  }, [currentObjectCategory]);

  useEffect(() => {
    setSpawnInput(spawnTileEffectInput);
  }, [spawnTileEffectInput]);

  useEffect(() => {
    setPersonalInput(personalTileEffectInput);
  }, [personalTileEffectInput]);

  useEffect(() => {
    if (isRightClick) {
      getViewPort().plugins.resume('drag');
    } else {
      getViewPort().plugins.pause('drag');
    }
  }, [isRightClick]);

  return (
    <ObjectSettingContainer onClick={() => offClickSide()}>
      {(currentObjectCategory === 'furniture' || currentObjectCategory === 'decoration' || currentObjectCategory === 'flask') && (
        <SettingItem>
          {isObjOptionChangeFurnDeco || isObjOptionChangeFlask ? (
            <h3>
              오브젝트 디테일 <span className="modificationText">수정</span>
            </h3>
          ) : (
            <h3>오브젝트 디테일</h3>
          )}
          <ObjectWrap>
            {currentSelectObject && (
              <>
                <Slider {...settings} className="swipe" ref={sliderRef}>
                  {['S', 'N', 'W', 'E'].map(direction => {
                    if (currentSelectObject[direction].length > 0) {
                      let firstObjectOfEacthDirection = {};
                      if (isEmpty(currentSelectObject.currentObj)) {
                        [firstObjectOfEacthDirection] = currentSelectObject[direction];
                      } else {
                        firstObjectOfEacthDirection = {
                          ...currentSelectObject.currentObj,
                          path: currentSelectObject.currentObj.path,
                        };
                        firstObjectOfEacthDirection = currentSelectObject.info.images[sliderIndex];
                      }
                      return (
                        <div className="item" key={firstObjectOfEacthDirection.id}>
                          <h4>{isUserImage ? '업로드 이미지' : currentSelectObject.info.name}</h4>
                          <img src={firstObjectOfEacthDirection.path} alt="이미지 없음" />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Slider>
                <div className="color-menu">
                  {currentSelectObject?.info?.images?.length > 0 &&
                    currentSelectObject[currentSelectObject?.info?.images[0]?.direction] &&
                    currentSelectObject[currentSelectObject.info.images[0].direction].map(item => {
                      return (
                        <ColorMenu
                          key={item?.id}
                          color={isUserImage ? 'inherit' : item?.color}
                          onClick={() => {
                            const colorObject = currentSelectObject.info.images
                              .filter(current => current.color === item?.color)
                              .filter(current => current.id === item?.id)[0];
                            selectObject(colorObject.id, colorObject.path, currentObjectCategory, true);
                            objectColorChangeSetSlider(colorObject);
                          }}
                        />
                      );
                    })}
                </div>
              </>
            )}
          </ObjectWrap>
        </SettingItem>
      )}
      <SettingItem currentObjectCategory={currentObjectCategory} tab={tab}>
        <ObjectSettingModal color="#fff" text={objSettingText} visible={objSettingModalVisible} />
        {(currentObjectCategory === 'wall' ||
          currentObjectCategory === 'floor' ||
          currentObjectCategory === 'background' ||
          currentObjectCategory === null) && <h3>타일효과</h3>}
        {(currentObjectCategory === 'furniture' ||
          currentObjectCategory === 'decoration' ||
          currentObjectCategory === 'flask') && (
          <TabMenu tab={tab}>
            <p className="advance-tab" onClick={() => onTabClick(env.tab.advance)}>
              고급옵션
            </p>
            <p className="tile-effect-tab" onClick={() => onTabClick(env.tab.tileEffect)}>
              타일효과
            </p>
          </TabMenu>
        )}
        <MenuWrap
          className={
            currentObjectCategory === 'furniture' || currentObjectCategory === 'decoration' || currentObjectCategory === 'flask'
              ? 'scroll'
              : ''
          }
          currentObjectCategory={currentObjectCategory}
        >
          {tab.advance && currentObjectCategory !== 'background' && (
            <AdvancedOptionWrap onClick={advancedOptionsInputClick}>
              <form>
                <div className="input-wrap">
                  {isObjOptionChangeFlask || currentObjectCategory === 'flask' ? <p>메시지</p> : <p>메시지</p>}
                  <div className="checkButton">
                    <input
                      ref={msgRef}
                      type="text"
                      placeholder={message ?? '메시지를 입력해주세요'}
                      onChange={e => {
                        setMessage(e.target.value);
                      }}
                      value={message ?? ''}
                    />
                    <button type="button" onClick={() => changeOption('message')}>
                      {isObjOptionChangeFurnDeco || isObjOptionChangeFlask ? '수정' : '저장'}
                    </button>
                  </div>
                </div>
                <div className="input-wrap">
                  <div className="checkbox">
                    {isObjOptionChangeFlask || currentObjectCategory === 'flask' ? <p>힌트</p> : <p>URL : &nbsp;</p>}
                    {isObjOptionChangeFlask || currentObjectCategory === 'flask' ? (
                      ''
                    ) : (
                      <>
                        <input ref={newTabRef} id="new_tab" type="checkbox" onClick={checkBoxHandle} />
                        <label htmlFor="new_tab"></label>
                        <p>&nbsp;새창으로 열기</p>
                      </>
                    )}
                  </div>
                  <div className="checkButton">
                    {isObjOptionChangeFlask || currentObjectCategory === 'flask' ? (
                      <>
                        <input
                          ref={urlRef}
                          type="text"
                          placeholder={url ?? '힌트를 입력해주세요'}
                          onChange={e => {
                            setUrl(e.target.value);
                          }}
                          value={url ?? ''}
                        />
                        <button type="button" onClick={() => changeOption('hint')}>
                          {isObjOptionChangeFurnDeco || isObjOptionChangeFlask ? '수정' : '저장'}
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          ref={urlRef}
                          type="text"
                          placeholder={url ?? 'url 주소'}
                          onChange={e => {
                            setUrl(e.target.value);
                          }}
                          value={url ?? ''}
                        />
                        <button type="button" onClick={() => changeOption('url')}>
                          {isObjOptionChangeFurnDeco || isObjOptionChangeFlask ? '수정' : '저장'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {tab.advance &&
                  isObjOptionChangeFurnDeco === false &&
                  isObjOptionChangeFlask === false &&
                  currentObjectCategory !== 'flask' && (
                    <>
                      <div className="input-wrap file-upload">
                        <div className="image-group">
                          <p>이미지</p>
                          <select
                            className="position-select"
                            value={uploadImagePosition}
                            onChange={e => setUploadImagePosition(e.target.value)}
                          >
                            <option value="10">맨 뒤에 위치</option>
                            <option value="20">캐릭터 움직임에 따라 위치 변동</option>
                            <option value="30">맨 앞에 위치</option>
                          </select>
                        </div>
                        <div className="file-upload-wrap">
                          <label className="file-label" htmlFor="file-upload"></label>
                          <input type="text" placeholder="파일선택" readOnly value={advancedOptionFilePath} />
                          <input
                            id="file-upload"
                            className="upload-hidden"
                            type="file"
                            onChange={e => {
                              setTempFile(e.target.files[0]);
                              setAdvancedOptionFilePath(e.target.value.split('\\').reverse()[0]);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              changeOption('image');
                            }}
                          >
                            저장
                          </button>
                        </div>
                      </div>
                      {currentObjectCategory === 'decoration' && (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                          <p>📢 캐릭터 앞에 오브젝트가 위치합니다.</p>
                        </div>
                      )}
                    </>
                  )}
                {isObjOptionChangeFurnDeco === false && currentObjectCategory !== 'flask' && (
                  <div className="input-wrap" style={{ display: 'none' }}>
                    <p>텍스트 업로드</p>
                    <div className="checkButton">
                      <input
                        ref={textRef}
                        type="text"
                        placeholder={text ?? '텍스트를 입력해주세요'}
                        onChange={e => {
                          setText(e.target.value);
                        }}
                        value={text ?? ''}
                      />
                      <button type="button" onClick={() => changeOption('text')}>
                        저장
                      </button>
                    </div>
                  </div>
                )}
                {(isObjOptionChangeFlask || currentObjectCategory === 'flask') && (
                  <div className="input-wrap">
                    <p>잠금 비밀번호: 최대10자(숫자, 영문)</p>
                    <div className="checkButton">
                      <input
                        maxLength="10"
                        ref={passwordRef}
                        type="text"
                        placeholder={password ?? '비밀번호를 입력해주세요'}
                        onChange={e => {
                          setPassword(e.target.value);
                        }}
                        value={password ?? ''}
                      />
                      <button type="button" onClick={() => changeOption('password')}>
                        {isObjOptionChangeFlask ? '수정' : '저장'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </AdvancedOptionWrap>
          )}
          {(tab.tileEffect || currentObjectCategory === 'background') && (
            <TileEffectWrap>
              <MenuItem
                active={selectedTileEffect === env.tileEffect.Eraser}
                color="rgb(255, 106, 106)"
                onClick={e => onTileEffectClick(e, 'eraser')}
              >
                <div className="icon">
                  <FAIcon icon={faEraser} size="2x" />
                </div>
                <div>
                  <h4>효과 지우기</h4>
                  <p>타일 효과를 지울 수 있다.</p>
                </div>
              </MenuItem>
              <MenuItem
                active={selectedTileEffect === env.tileEffect.Impossible}
                color="rgb(255, 192, 74)"
                onClick={e => {
                  onTileEffectClick(e, 'impossible');
                }}
              >
                <div className="icon">
                  <FAIcon icon={faTimesCircle} size="2x" />
                </div>
                <div>
                  <h4>통행금지</h4>
                  <p>지나갈 수 없는 구역</p>
                </div>
              </MenuItem>
              <ExpandMenuItem active={selectedTileEffect === env.tileEffect.Spawn} color="rgb(255, 255, 123)">
                <div
                  className="contents"
                  onClick={e => {
                    onTileEffectClick(e, 'spawn');
                    onChangeSpawnInput(e);
                  }}
                >
                  <div className="icon">
                    <FAIcon icon={faStreetView} size="2x" />
                  </div>
                  <div>
                    <h4>시작위치</h4>
                    <p>초기에 도착하는 위치를 정하는 구역(1개 이상 지정 필수)</p>
                  </div>
                </div>
                {selectedTileEffect === env.tileEffect.Spawn && (
                  <div className="expand" style={{ display: 'none' }}>
                    <span>시작위치 타일 이름</span>
                    <input
                      type="text"
                      placeholder="시작 타일 이름 설정하기"
                      onChange={onChangeSpawnInput}
                      value={spawnTileEffectInput}
                    />
                  </div>
                )}
              </ExpandMenuItem>
              <ExpandMenuItem
                active={selectedTileEffect === env.tileEffect.Personal}
                color="rgb(195, 235, 116)"
                onClick={() => {
                  advancedOptionsInputClick();
                }}
              >
                <div
                  className="contents"
                  onClick={e => {
                    onTileEffectClick(e, 'personal');
                  }}
                >
                  <div className="icon">
                    <FAIcon icon={faUsers} size="2x" />
                  </div>
                  <div>
                    <h4>개인공간</h4>
                    <p>조별 소통 구역</p>
                  </div>
                </div>
                {selectedTileEffect === env.tileEffect.Personal && (
                  <div className="expand">
                    <span>* 구역이름 : 숫자입력</span>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      max="100"
                      placeholder="구역 설정하기"
                      onClick={() => {
                        advancedOptionsInputClick();
                      }}
                      onChange={e => {
                        if (/^[0]/.test(e.target.value)) {
                          e.target.value = null;
                        } else if (e.target.value < Number(e.target.max)) {
                          onChangePersonalInput(e);
                        } else if (typeof e.target.value === 'string') {
                          e.target.value = null;
                        }
                      }}
                      value={personalTileEffectInput}
                    />
                  </div>
                )}
              </ExpandMenuItem>
              <MenuItem
                active={selectedTileEffect === env.tileEffect.Spotlight}
                color="rgb(225, 143, 250)"
                onClick={e => {
                  onTileEffectClick(e, 'spotlight');
                }}
              >
                <div className="icon">
                  <FAIcon icon={faBullhorn} size="2x" />
                </div>
                <div>
                  <h4>스포트라이트</h4>
                  <p>전체 사람들에게 이야기할 수 있는 구역</p>
                </div>
              </MenuItem>
              <PortalItem
                active={selectedTileEffect === env.tileEffect.Portal}
                color="rgb(138, 138, 255)"
                onClick={() => {
                  if (TileActiveHandle) {
                    TileActiveHandle();
                    allTileEffectVisible();
                  }
                  setPortalModalVisible(true);
                }}
              >
                <div className="icon">
                  <FAIcon icon={faDoorOpen} size="2x" />
                </div>
                <div>
                  <h4>포털</h4>
                  <p>다른 방으로 이동하는 구역</p>
                </div>
              </PortalItem>
            </TileEffectWrap>
          )}
        </MenuWrap>
        <PortalModal visible={portalModalVisible} onClose={onClosePortalModal} />
      </SettingItem>
    </ObjectSettingContainer>
  );
};

const ObjectSettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  width: 100%;
  background-color: #dbf1ef;
  align-items: center;
  padding: 20px 0;
  overflow-y: auto;
  font-family: 'NanumSquareRound';

  &::-webkit-scrollbar {
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #355d64;
    border-radius: 20px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }

  input {
    display: block;
    margin-top: 10px;
    width: 80%;
    height: 35px;
    border-radius: 5px;
    border: 2px solid #648286;
    padding: 0 15px;
    outline: none;
    font-family: 'NanumSquareRound';
  }

  button {
    display: block;
    margin-top: 10px;
    width: 20%;
    height: 35px;
    border-radius: 5px;
    border: 2px solid #648286;
    padding: 0 5px;
    outline: none;
    font-family: 'NanumSquareRound';
    cursor: pointer;
  }
`;

const SettingItem = styled.div`
  z-index: 2;
  width: 100%;
  text-align: center;
  border-radius: 5px;

  h3 {
    margin-bottom: 10px;
    font-family: 'SBAggroL';
    color: #355e64;
  }

  .modificationText {
    color: red;
  }

  .scroll {
    overflow-y: ${props =>
      props.currentObjectCategory === 'furniture' ||
      props.currentObjectCategory === 'decoration' ||
      props.currentObjectCategory === 'flask'
        ? 'auto'
        : ''};

    &::-webkit-scrollbar {
      width: 13px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #355d64;
      border-radius: 20px;
      background-clip: padding-box;
      border: 3px solid transparent;
    }
  }

  & + & {
    margin-top: 30px;
  }
`;

const TabMenu = styled.div`
  display: flex;
  margin: 0 15px;

  p {
    width: 50%;
    padding: 15px 0;
    border-radius: 20px 20px 0 0;
    color: #355d64;
    font-weight: bold;
    cursor: pointer;
  }

  .advance-tab {
    background-color: ${props => (props.tab.advance ? 'white' : '#dbf1ef')};
  }

  .tile-effect-tab {
    background-color: ${props => (props.tab.tileEffect ? 'white' : '#dbf1ef')};
  }
`;

const MenuWrap = styled.div`
  background-color: white;
  margin: 0 15px;
  padding-top: 10px;
  border-radius: ${props => {
    if (
      props.currentObjectCategory === 'wall' ||
      props.currentObjectCategory === 'floor' ||
      props.currentObjectCategory === null
    ) {
      return '20px';
    }

    return '0 0 20px 20px';
  }};
  max-height: 493px;

  h3 {
    padding: 15px 0;
    margin: 0;
  }
`;

const AdvancedOptionWrap = styled.div`
  padding: 16px;

  form {
    display: flex;
    align-items: start;
    flex-direction: column;

    .input-wrap {
      text-align: start;
      width: 100%;
      margin-bottom: 10px;
    }
    
    .image-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 30px;
      .position-select {
        font-family: 'NanumSquareRound';
        padding: 0 5px;
        min-height: 30px;
        border: 2px solid tomato;
        border-radius: 5px;
      }
    }

    .checkbox {
      display: flex;
      align-items: center;
      input[type='checkbox'] {
        margin: 0;
        width: 17px;
        height: 17px;
        cursor: pointer;
        display: none;
      }
      input[id='new_tab'] + label {
        display: inline-block;
        margin: 0;
        width: 17px;
        height: 17px;
        border: 2px solid #8a8aff;
        border-radius: 5px;
        cursor: pointer;
      }

      input[id='new_tab']:checked + label {
        background-color: #8a8aff;
      }
    }

    .checkButton {
      display: flex;
    }

    .file-upload {
      width: 100%;
      display: flex;
      flex-direction: column;

      .file-upload-wrap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .file-label {
          width: 80%;
          height: 35px;
          border-radius: 5px;
          border: 2px solid #648286;
          position: absolute;
          bottom: 0;
          z-index: 1;
        }

        .upload-hidden {
          display: none;
        }
      }
    }
  }

  label {
    display: inline-block;
  }

  p {
    font-weight: bold;
  }
`;

const TileEffectWrap = styled.div`
  height: 500px;
`;

const ObjectWrap = styled(MenuWrap)`
  height: 250px;
  border-radius: 20px;

  .swipe {
    height: 170px;
    margin: 0 10px;
  }

  .item {
    h4 {
      margin-top: 10px;
      margin-bottom: 20px;
      color: #355e64;
    }

    img {
      margin: 0 auto;
      height: 96px;
      width: 96px;
      object-fit: contain;
    }
  }

  .color-menu {
    display: flex;
    margin: 0 50px;
    cursor: pointer;
  }
`;

const ColorMenu = styled.div`
  width: 25px;
  height: 25px;
  border: ${props => props.color === 'white' && '1px solid black'};
  background-color: ${props => props.color};
`;

const MenuItem = styled.div`
  display: flex;
  padding: 10px 20px;
  text-align: start;
  cursor: pointer;
  background-color: ${props => (props.active ? '#e7f7f5' : 'white')};
  border-radius: 20px 20px 0 0;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 52px;
    padding: 10px;
    margin-right: 20px;
    border-radius: 8px;
    background-color: ${props => props.color};
  }

  h4 {
    margin: 0;
    padding-bottom: 5px;
  }

  &:hover {
    background-color: #e7f7f5;
    border-radius: 5px;
  }

  &:last-child:hover {
    border-radius: 20px;
  }
`;

const PortalItem = styled.div`
  display: flex;
  padding: 10px 20px;
  text-align: start;
  border-radius: 5px 5px 20px 20px;
  cursor: pointer;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 52px;
    padding: 10px;
    margin-right: 20px;
    border-radius: 8px;
    background-color: ${props => props.color};
  }

  h4 {
    margin: 0;
    padding-bottom: 5px;
  }

  span {
    color: white;
  }

  &:hover {
    background-color: #e7f7f5;
    border-radius: 5px;
  }
`;

const ArrowWrap = styled.div`
  position: absolute;
  color: #355e64;
  cursor: pointer;
  z-index: 5;
  top: 80px;

  ${props => {
    if (props.className.includes('slick-disabled')) {
      return css`
        cursor: default;
        opacity: 0.3;
      `;
    }
  }}

  &:before {
    display: none;
  }

  svg {
    width: 20px !important;
    height: 20px;

    &:hover {
      color: #355e64;
    }
  }
`;

const ExpandMenuItem = styled(MenuItem)`
  flex-direction: column;

  .contents {
    display: flex;
  }

  .expand {
    border-top: 1px solid #acd2d8;
    padding-top: 15px;
    margin-top: 15px;
    cursor: auto;
  }
`;

const PreviousArrowWrap = styled(ArrowWrap)`
  left: 50px;
`;

const NextArrowWrap = styled(ArrowWrap)`
  right: 50px;
`;

export default ObjectSettingComponent;
