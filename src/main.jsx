import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const image = (number) => `/tutorial-images/step-${String(number).padStart(2, '0')}.png`;
const lastUpdated = '2026-07-22';
const imageSize = {
  1: [1267, 63], 2: [1184, 425], 3: [1377, 1224], 4: [1251, 658], 5: [708, 412],
  6: [1181, 450], 7: [702, 234], 8: [764, 275], 9: [1268, 583], 10: [574, 277],
  11: [770, 337], 12: [1093, 905], 13: [899, 258], 14: [760, 838], 15: [755, 640],
  16: [1718, 960], 17: [803, 569], 18: [836, 539], 19: [733, 827], 20: [783, 780],
  21: [636, 138], 22: [747, 562], 23: [696, 541], 24: [662, 589], 25: [748, 570],
  26: [1268, 671], 27: [366, 288], 28: [1269, 758], 29: [486, 692], 30: [265, 340],
  31: [958, 335], 32: [661, 346], 33: [308, 240], 34: [508, 209], 35: [829, 76]
};

const sections = [
  {
    id: 'account', title: '登录网站与创建账号', items: [
      { title: '创建账号与说明', lines: ['进入网站overstat.gg', '点击Account按正常流程创建个人账号', '点击Organizer进入Organizer页面', 'Organizer用于创建比赛，一个账号可以加入多个Organization'], images: [1] },
      { title: '面板说明', lines: ['My Organizations 是你已经加入的Organization','API Key Login 是直接使用api key登入对应Organization'], images: [2] },
      { title: '创建Organizer', lines: ['点击My Organizations下方的Create new account 创建自己的Organization'] },
      { title: '邀请赛管', lines: ['在自己的Organization里面添加赛管进自己的组织', '添加方法为输入赛管的overstat账号名称（该名称是唯一的）'], images: [3] }
    ]
  },
  {
    id: 'launch-options', title: '启动项', items: [
      { lines: ['启动项必须添加到管理该房间的账号上，即赛管账号。']},
      { title: '添加一个新赛管', variant: 'label' },
      { lines: ['选择左边Apex Clients，点击CONNECT NEW，输入自己游戏内（Steam或者EA）名字，然后点击ADD添加该账号'], images: [4] },
      { title: '添加启动项', variant: 'label' },
      { lines: ['复制下方代码到游戏启动项'], images: [5] },
      { title: '查看启动项是否生效', variant: 'label' },
      { lines: ['在Apex Clients页面能看到对应账号已经上线（显示为online）'], images: [6] },
      { lines: ['如图点击，选择自己作为赛管'], images: [7] },
      { lines: ['请务必选择本Organizer的赛管作为Client','否则可能会出现重大错误'], images: [8] }
    ]
  },
  {
    id: 'create-match', title: '创建一场比赛', items: [
      { lines: ['一场比赛对应一个或多个房间（Match）','一场比赛下会有多个小局（Game）']},
      { title: '创建比赛', lines: ['如图，创建比赛（点击第二个，Match Manager）'], images: [9] },
      { lines: ['创建新比赛，输入比赛名称'], images: [10] },
      { lines: ['输入日期和比赛分组'], images: [11] },
      { lines: ['在SCORING输入你用到的房间码对应的Stats Codes'], images: [12] },
      { title: '创建比赛地图池', lines: ['点击DROPS -> CONFIGURE'], images: [13] },
      { lines: ['点击第二栏的MAPS，选择比赛地图'], images: [14] },
      { lines: ['随后设置任意密码（记住），点击保存','该密码将在队伍选点的时候使用'], images: [15] },
      { title: '填写队伍名' },
      { title: '方式一', variant: 'label', lines: ['直接在队伍的框上编辑队伍名字'], images: [16] },
      { title: '方式二', variant: 'label', lines: ['点击LOBBY，再点击import teams，随后将选点表中队伍名复制过来', '每个队伍名占一行'], images: [17] },
      { title: '填写跳点' },
      { title: '手动分配', variant: 'label', lines: ['再次点击drops，之后点击import'], images: [18] },
      { lines: ['序号对应地图上的跳点序号'], images: [19] },
      { lines: ['将队伍选点序号输入（回车跳转至下一行），输入完成后如上图', '默认情况下是允许一个跳点存在多个队伍的，请注意'], images: [20] },
      { title: '自由选点', variant: 'label' }
    ]
  },
  {
    id: 'in-game', title: '对局中的设置', items: [
      { title: 'Ban英雄', lines: ['点击LOBBY下的SETUP INGAME LOBBY，', '然后按顺序点击BANS，Set Bans（不推荐点第二个选项，可能有bug）随后寻找需要ban的英雄（可多选），', '最后点击SETUP确定ban位设置。'], images: [21, 22] },
      { title: '更换地图', lines: ['DROPS负责的是跳点', 'LOBBYSETTINGS负责的是房间内的地图更换', '需要同时更换下一章地图和点位（即LOBBY SETTINGS和DROPS选的地图应该一致）'], images: [23, 24] },
      { lines: ['2.确认游戏内地图更换后，再重新ban角色', '不要勾选第二个（Automatic Bans），点击英雄自行搜索'], images: [25] }
    ]
  },
  {
    id: 'scoring', title: '分数计算', items: [
      { title: '记录分数', lines: ['1.点击scoring，之后将上一场相同位置的代码复制到codes一栏（如图）'], images: [26] },
      { lines: ['2.复制完成后，点击下方add，随后右方会显示分数排名（点击一次即可，不要重复点击，没有反应可能是正在加载）'], images: [27] },
      { title: '分数清零', lines: ['如果有队伍在一场比赛积分清零，先点击右侧具体场次，随后点击该队分数，修改后上传'], images: [28] },
      { title: '补充', variant: 'note', lines: ['1.分数上传在第一把（即有效对局）结束后添加即可', '2.复制的代码应复制上一场A/B组，不能把A组代码复制进B组比赛', '3.不要多次点击添加分数，数据上传会有延迟，否则会导致数据叠加'] }
    ]
  },
  {
    id: 'troubleshooting', title: '卡房问题', items: [
      { lines: ['1.如果遭遇卡房，请找到本组另一个代码，创建房间后按照创建对局的方式重新录入。', '2.如果进入游戏后跳点错误，重新录入跳点，其他设置无需修改，如果依旧错误，尝试更换启动项人员或更换房间'] }
    ]
  },
  {
    id: 'draft', title: '混选跳点', items: [
      { title: '赛管设置', lines: ['填写完所有队伍名称之后（参见创建新对局下的填写队伍名）', '点击DROPS下的CONFIGURE，DROP TYPE点击DRAFT，', '地图选择带有ALGS的标签的。', 'Team Choose Timer：每队每轮选点的倒计时长度，建议为120秒。', 'Draft Ordering Mode：', 'Normal：会按照你在LOBBY中设置的队伍顺序为顺位开始选点', 'Sanke：蛇形选点，第一张图第一个选位的队伍在下一张是倒数第一个选点', '3 Map Balanced：没试过，不知道', 'Auto Assign：在选点全部结束后，给超时未选的队伍自动分配到尚未被选择的点位。', '中间的Draft Start Time是选点开始时间（不推荐，建议直接手动开始）'], images: [29] },
      { title: '开始选点前队伍状态', lines: ['赛管可以在左侧看出队伍是否被认领，观察是否符合开始选点的状态。', '亮起绿灯即说明该队伍已经准备好选点（已被认领）。'], images: [30] },
      { title: '选点开始', lines: ['填写完密码（参考创建比赛地图池最后填写的密码）后，将选点网址发给队长。', '设置完成后，赛管点击START NOW即可开始混选。'], images: [31,32] },
      { title: '队伍选点', lines: ['选择JOIN DRAFT，并输入赛管给的密码，认领自己的队伍，等待选点开始。', '选点时可以任选一张的任意一个点，直接点击图中的点位即可。'], images: [33] },
      { lines: ['（注意，此网站的选点模式中，多个队选同一个点是被允许的，如果比赛规则不需要roll点，需要在选点前提前告知各个队伍）'], images: [34] }
    ]
  },
  {
    id: 'room-code', title: '房间码文件说明', items: [
      { lines: ['以右图为例，从左到右分别是'], images: [35] },
      { title: '1.房间码可用开始时间' },
      { title: '2.房间码可用开始时间' },
      { title: '3.房间码对应的Stats Codes' },
      { title: '4.管理员码' ,lines: ['赛管进入房间用，进入后会有一个皇冠标识','只有赛管才可以对房间进行任何设置','不应该泄露给无关人员']},
      { title: '5.选手码' ,lines: ['发给选手进入房间用']},

    ]
  }
];

const normalizeSearchText = (value) => value.trim().toLocaleLowerCase();

const matchesItem = (item, query) => (
  item.title?.toLocaleLowerCase().includes(query)
  || item.lines?.some((line) => line.toLocaleLowerCase().includes(query))
);

const withHeadingLevels = (items) => {
  let hasPrimaryHeading = false;

  return items.map((item, index) => {
    if (!item.title) return { ...item, index, headingLevel: null };

    const isAuxiliaryHeading = item.variant === 'label' || item.variant === 'note' || item.minor;
    const headingLevel = isAuxiliaryHeading && hasPrimaryHeading ? 3 : 2;

    if (!isAuxiliaryHeading) hasPrimaryHeading = true;

    return { ...item, index, headingLevel };
  });
};

function TutorialImage({ number, onOpen }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [width, height] = imageSize[number];

  return (
    <button
      type="button"
      className={`image-card${isLoaded ? ' is-loaded' : ''}`}
      style={{ '--image-ratio': `${width} / ${height}` }}
      onClick={() => onOpen(number)}
      aria-busy={!isLoaded}
    >
      {!isLoaded && <span className="image-skeleton" aria-hidden="true" />}
      <img src={image(number)} width={width} height={height} alt="" loading="lazy" onLoad={() => setIsLoaded(true)} />
    </button>
  );
}

function ArticleSkeleton() {
  return (
    <article className="content article-skeleton" aria-hidden="true">
      <div className="skeleton-block skeleton-title" />
      <div className="skeleton-row">
        <div className="skeleton-copy">
          <div className="skeleton-block skeleton-heading" />
          <div className="skeleton-block skeleton-line skeleton-line--full" />
          <div className="skeleton-block skeleton-line skeleton-line--wide" />
          <div className="skeleton-block skeleton-line skeleton-line--medium" />
        </div>
        <div className="skeleton-block skeleton-image" />
      </div>
      <div className="skeleton-row skeleton-row--secondary">
        <div className="skeleton-copy">
          <div className="skeleton-block skeleton-heading skeleton-heading--small" />
          <div className="skeleton-block skeleton-line skeleton-line--wide" />
          <div className="skeleton-block skeleton-line skeleton-line--short" />
        </div>
        <div className="skeleton-block skeleton-image skeleton-image--small" />
      </div>
    </article>
  );
}

function TutorialItem({ item, index, sectionId, onImageOpen }) {
  const HeadingTag = item.headingLevel === 3 ? 'h3' : 'h2';

  return (
    <section id={sectionId ? `${sectionId}-item-${index}` : undefined} className={`item${item.images?.length ? ' item-with-images' : ''}${item.variant ? ` item--${item.variant}` : ''}`} key={`${item.title ?? 'text'}-${index}`}>
      {item.title && <HeadingTag className={`item-heading item-heading--level-${item.headingLevel}`}>{item.title}</HeadingTag>}
      {item.lines?.length > 0 && <div className="item-text">{item.lines.map((line, lineIndex) => <p key={`${line}-${lineIndex}`}>{line}</p>)}</div>}
      {item.images?.length > 0 && <div className={`image-grid images-${Math.min(item.images.length, 3)}`}>
        {item.images.map((number) => <TutorialImage number={number} key={number} onOpen={onImageOpen} />)}
      </div>}
    </section>
  );
}

function App() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [expandedId, setExpandedId] = useState(sections[0].id);
  const [query, setQuery] = useState('');
  const [lightbox, setLightbox] = useState(null);
  const [isPageReady, setIsPageReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const normalizedQuery = normalizeSearchText(query);
  const isSearching = normalizedQuery.length > 0;
  const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];
  const activeItems = withHeadingLevels(activeSection.items);
  const searchResults = isSearching
    ? sections.reduce((results, section) => {
      const sectionMatches = section.title.toLocaleLowerCase().includes(normalizedQuery);
      const sectionItems = withHeadingLevels(section.items);
      const matchingItems = sectionMatches ? sectionItems : sectionItems.filter((item) => matchesItem(item, normalizedQuery));
      return matchingItems.length > 0 ? [...results, { section, items: matchingItems }] : results;
    }, [])
    : [];
  const visibleSections = isSearching ? searchResults.map(({ section }) => section) : sections;

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setIsPageReady(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isSearching) {
      setActiveItemIndex(null);
      return undefined;
    }

    const titledItemIndexes = activeItems.filter((item) => item.title).map((item) => item.index);

    if (titledItemIndexes.length === 0) {
      setActiveItemIndex(null);
      return undefined;
    }

    let frameId = 0;
    const updateActiveItem = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        const offset = window.innerWidth <= 720 ? 180 : 260;
        let currentIndex = null;

        titledItemIndexes.forEach((index) => {
          const element = document.getElementById(`${activeSection.id}-item-${index}`);
          if (element && element.getBoundingClientRect().top <= offset) currentIndex = index;
        });

        setActiveItemIndex((previousIndex) => previousIndex === currentIndex ? previousIndex : currentIndex);
        frameId = 0;
      });
    };

    updateActiveItem();
    window.addEventListener('scroll', updateActiveItem, { passive: true });
    window.addEventListener('resize', updateActiveItem);

    return () => {
      window.removeEventListener('scroll', updateActiveItem);
      window.removeEventListener('resize', updateActiveItem);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [activeSection.id, isSearching]);

  const selectSection = (id, clearSearch = false) => {
    setActiveId(id);
    setActiveItemIndex(null);
    setExpandedId(id);
    setIsMenuOpen(false);
    if (clearSearch) setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectItem = (sectionId, itemIndex) => {
    setActiveId(sectionId);
    setActiveItemIndex(itemIndex);
    setQuery('');
    setExpandedId(sectionId);
    setIsMenuOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(`${sectionId}-item-${itemIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })));
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={isMenuOpen ? '关闭目录' : '打开目录'}
          aria-controls="chapter-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
        <span>TimeP1ayer</span>
      </header>
      {isMenuOpen && <button type="button" className="menu-backdrop" aria-label="关闭目录" onClick={() => setIsMenuOpen(false)} />}
      <aside className={`sidebar${isMenuOpen ? ' mobile-open' : ''}`}>
        <input
          className="chapter-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && visibleSections.length > 0) selectSection(visibleSections[0].id, true);
          }}
          aria-label="搜索教程标题和正文"
          placeholder="搜索教程"
          autoComplete="off"
          spellCheck="false"
        />
        <nav id="chapter-navigation" aria-label="章节">
          {visibleSections.map((section) => {
            const sectionMatches = section.title.toLocaleLowerCase().includes(normalizedQuery);
            const subItems = withHeadingLevels(section.items)
              .filter((item) => item.title && (!isSearching || sectionMatches || item.title.toLocaleLowerCase().includes(normalizedQuery)));
            const isActive = !isSearching && section.id === activeSection.id;
            const isExpanded = expandedId === section.id;

            return (
              <div className="chapter-nav" key={section.id}>
                <button type="button" className={`chapter-button${isActive ? ' active' : ''}`} onClick={() => selectSection(section.id, isSearching)}>
                  {section.title}
                </button>
                {isExpanded && subItems.length > 0 && <div className="subnav">
                  {subItems.map((item) => (
                    <button
                      type="button"
                      className={`subnav-item level-${item.headingLevel}${isActive && activeItemIndex === item.index ? ' active' : ''}`}
                      key={`${section.id}-${item.index}`}
                      onClick={() => selectItem(section.id, item.index)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>}
              </div>
            );
          })}
        </nav>
      </aside>
      <main>
        {!isPageReady ? <ArticleSkeleton /> : isSearching ? (
          <article className="content search-results" key={normalizedQuery}>
            <h1>搜索结果</h1>
            {searchResults.length > 0 ? (
              <div className="result-list">
                {searchResults.map(({ section, items }) => (
                  <section className="result-section" key={section.id}>
                    <h2>{section.title}</h2>
                    <div className="item-list">
                      {items.map((item) => <TutorialItem item={item} index={item.index} key={`${item.title ?? 'text'}-${item.index}`} onImageOpen={setLightbox} />)}
                    </div>
                  </section>
                ))}
              </div>
            ) : <p className="empty-search">未找到与“{query.trim()}”相关的教程内容。</p>}
          </article>
        ) : (
          <article className="content" key={activeSection.id}>
            <h1>{activeSection.title}</h1>
            <div className="item-list">
              {activeItems.map((item) => <TutorialItem item={item} index={item.index} sectionId={activeSection.id} key={`${item.title ?? 'text'}-${item.index}`} onImageOpen={setLightbox} />)}
            </div>
          </article>
        )}
        {isPageReady && <footer className="last-updated">最后更新时间：{lastUpdated}</footer>}
      </main>
      {lightbox && <div className="lightbox" role="presentation" onClick={() => setLightbox(null)}><img src={image(lightbox)} alt="" onClick={(event) => event.stopPropagation()} /></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
