export type Arcana = 'major' | 'minor';
export type Suit = 'cups' | 'wands' | 'swords' | 'pentacles';

export interface TarotCard {
  id: string;
  name: string;
  name_zh: string;
  number: number;
  arcana: Arcana;
  suit?: Suit;
  keywords: string[];
  upright: { meaning: string; love: string; career: string; advice: string };
  reversed: { meaning: string; love: string; career: string; advice: string };
  element: string;
  color: string; // accent color hex
}

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'major-00', name: 'The Fool', name_zh: '愚者', number: 0,
    arcana: 'major', element: '風',
    keywords: ['新開始', '自由', '冒險', '天真'],
    upright: {
      meaning: '一段新旅程即將展開，帶著純粹的熱情踏入未知。',
      love: '一段新的戀情可能以意想不到的方式出現，保持開放心態。',
      career: '勇於嘗試未曾涉足的領域，機遇在自由探索中誕生。',
      advice: '放下過度的謹慎，相信直覺，跳躍進入未知。'
    },
    reversed: {
      meaning: '魯莽行事帶來風險，需要更多準備才能行動。',
      love: '衝動進入關係可能造成傷害，先了解自己的需求。',
      career: '缺乏計劃的行動正在浪費潛力，退一步重新評估。',
      advice: '過於衝動，需要為自己的行為承擔責任。'
    },
    color: '#C4902D'
  },
  {
    id: 'major-01', name: 'The Magician', name_zh: '魔術師', number: 1,
    arcana: 'major', element: '水星',
    keywords: ['意志力', '技巧', '資源', '創造'],
    upright: {
      meaning: '你擁有實現目標所需的一切工具，是時候展現力量。',
      love: '主動出擊，用真誠的行動吸引你渴望的連結。',
      career: '技能與機遇完美對齊，把握此刻展現你的能力。',
      advice: '專注意志，你有能力將想法化為現實。'
    },
    reversed: {
      meaning: '能力被浪費，或有人在利用技巧進行欺騙。',
      love: '表面的魅力掩蓋了真實意圖，需要更深入了解對方。',
      career: '才能未被充分發揮，或有欺詐跡象需要警惕。',
      advice: '避免操縱他人，誠實地運用你的才能。'
    },
    color: '#E8A020'
  },
  {
    id: 'major-02', name: 'The High Priestess', name_zh: '女祭司', number: 2,
    arcana: 'major', element: '月亮',
    keywords: ['直覺', '潛意識', '神秘', '智慧'],
    upright: {
      meaning: '傾聽內心深處的聲音，答案已在你的直覺之中。',
      love: '感情中有未說出口的深意，相信你的直覺感受。',
      career: '此刻不適合倉促決定，讓資訊慢慢浮現。',
      advice: '靜下來冥想，內在智慧比外在建議更可靠。'
    },
    reversed: {
      meaning: '壓抑直覺或資訊被刻意隱藏，需要揭露真相。',
      love: '情緒壓抑造成阻礙，試著表達內心真實感受。',
      career: '重要資訊尚未浮現，不要在資訊不完整時做大決策。',
      advice: '你在忽視某些重要的內在信號。'
    },
    color: '#5B8DB8'
  },
  {
    id: 'major-03', name: 'The Empress', name_zh: '女皇', number: 3,
    arcana: 'major', element: '金星',
    keywords: ['豐盛', '創造力', '母性', '自然'],
    upright: {
      meaning: '創造力與豐盛在你的生命中茁壯，滋養自己與他人。',
      love: '關係充滿溫暖與滋養，愛情豐沛生長。',
      career: '創意項目蓬勃發展，物質豐盛即將到來。',
      advice: '擁抱你的創造力，讓事物自然生長成形。'
    },
    reversed: {
      meaning: '創造力受阻或過度依賴他人，需要重建自主。',
      love: '過度付出可能導致失衡，學習適度的愛自己。',
      career: '創意被壓制，或財務問題需要重新審視。',
      advice: '照顧好自己，才能真正滋養他人。'
    },
    color: '#7CB87A'
  },
  {
    id: 'major-04', name: 'The Emperor', name_zh: '皇帝', number: 4,
    arcana: 'major', element: '牡羊座',
    keywords: ['權威', '結構', '穩定', '父性'],
    upright: {
      meaning: '建立穩固的基礎，以紀律和結構達成目標。',
      love: '穩定的承諾與長期規劃是關係發展的關鍵。',
      career: '領導力受到認可，建立清晰的結構有助成功。',
      advice: '用邏輯與計劃取代情緒化的決策。'
    },
    reversed: {
      meaning: '權威被濫用，過於死板的規則窒礙發展。',
      love: '控制慾或不成熟的行為破壞了關係平衡。',
      career: '上司或規則帶來壓力，需要找到靈活應對的方式。',
      advice: '放鬆過於強硬的掌控，讓事情自然發展。'
    },
    color: '#C94444'
  },
  {
    id: 'major-05', name: 'The Hierophant', name_zh: '教皇', number: 5,
    arcana: 'major', element: '金牛座',
    keywords: ['傳統', '信仰', '制度', '精神指引'],
    upright: {
      meaning: '尋求傳統智慧或精神指引，從既有的系統中汲取力量。',
      love: '傳統關係觀或婚姻被強調，尋求精神上的連結。',
      career: '遵循既定規則與傳統流程是成功的關鍵。',
      advice: '向有智慧的前輩請教，尊重傳統的力量。'
    },
    reversed: {
      meaning: '打破傳統，質疑既有規範，尋求個人真理。',
      love: '不受傳統束縛的關係模式，或在壓力下的反叛。',
      career: '傳統方法已不適用，需要創新思維。',
      advice: '勇於打破限制你的規則，但確保有充分理由。'
    },
    color: '#9B7CB8'
  },
  {
    id: 'major-06', name: 'The Lovers', name_zh: '戀人', number: 6,
    arcana: 'major', element: '雙子座',
    keywords: ['愛情', '選擇', '關係', '和諧'],
    upright: {
      meaning: '重要的選擇即將來臨，以心為指引做出符合價值觀的決定。',
      love: '深厚的靈魂連結或重要的感情決定，跟隨真心。',
      career: '面臨職業分叉路，選擇真正熱愛的方向。',
      advice: '讓你的選擇反映你最深層的價值觀。'
    },
    reversed: {
      meaning: '關係不和諧或面臨艱難抉擇，需要誠實面對自己的感受。',
      love: '溝通不暢或關係出現裂痕，需要直面問題。',
      career: '職業選擇帶來後悔，或與同事關係緊張。',
      advice: '不要因為害怕而逃避重要的選擇。'
    },
    color: '#D4729A'
  },
  {
    id: 'major-07', name: 'The Chariot', name_zh: '戰車', number: 7,
    arcana: 'major', element: '巨蟹座',
    keywords: ['勝利', '意志', '掌控', '決心'],
    upright: {
      meaning: '憑藉強大的意志力克服障礙，勝利在掌握之中。',
      love: '主動推進關係，用行動證明你的承諾。',
      career: '競爭中脫穎而出，堅定的目標帶來成功。',
      advice: '掌握方向盤，不讓對立的力量分散你的注意力。'
    },
    reversed: {
      meaning: '失去方向或自我控制，行動力散漫帶來挫折。',
      love: '強迫推進反而讓對方退縮，試著退後一步。',
      career: '計劃脫軌或缺乏自律，需要重新整頓方向。',
      advice: '停止用蠻力，學習靈活調整策略。'
    },
    color: '#4A90D9'
  },
  {
    id: 'major-08', name: 'Strength', name_zh: '力量', number: 8,
    arcana: 'major', element: '獅子座',
    keywords: ['勇氣', '耐心', '內在力量', '溫柔'],
    upright: {
      meaning: '真正的力量來自內心，以溫柔和耐心征服挑戰。',
      love: '以理解和包容建立更深的連結，愛能克服一切障礙。',
      career: '堅持與耐心將戰勝困難，不要輕易放棄。',
      advice: '你比自己想像的更強大，相信你的內在資源。'
    },
    reversed: {
      meaning: '自我懷疑或壓抑情緒，需要重建對自己的信任。',
      love: '不安全感破壞了關係，學習先愛自己。',
      career: '缺乏自信阻礙了進步，需要重建內在力量。',
      advice: '面對你的恐懼，而不是逃避它們。'
    },
    color: '#E8A020'
  },
  {
    id: 'major-09', name: 'The Hermit', name_zh: '隱者', number: 9,
    arcana: 'major', element: '處女座',
    keywords: ['反思', '孤獨', '內省', '智慧'],
    upright: {
      meaning: '需要獨處和反思，退入內心尋找真正的答案。',
      love: '在投入新關係前，先了解自己真正需要什麼。',
      career: '獨立研究或靜心思考比集體決策更有效。',
      advice: '給自己空間和時間，答案在沉靜中浮現。'
    },
    reversed: {
      meaning: '過度孤立或逃避社交，需要重新融入外部世界。',
      love: '孤立自己正在阻礙有意義連結的建立。',
      career: '過於固執於自己的想法，可能錯失外部視角。',
      advice: '孤獨應是選擇，而非逃避的藉口。'
    },
    color: '#7A9B7A'
  },
  {
    id: 'major-10', name: 'Wheel of Fortune', name_zh: '命運之輪', number: 10,
    arcana: 'major', element: '木星',
    keywords: ['命運', '轉機', '循環', '機遇'],
    upright: {
      meaning: '命運的輪子正在轉動，好運與改變即將到來。',
      love: '命中注定的相遇或關係進入新的轉折點。',
      career: '意外的機遇帶來突破，把握此刻的轉機。',
      advice: '接受生命的循環，學習在變化中保持靈活。'
    },
    reversed: {
      meaning: '運勢停滯或不斷重複同樣的錯誤，需要打破惡性循環。',
      love: '關係陷入重複的模式，需要認識並打破它。',
      career: '壞運氣或時機不對，等待輪子再次轉動。',
      advice: '你無法控制外部環境，但可以控制自己的反應。'
    },
    color: '#D4902D'
  },
  {
    id: 'major-11', name: 'Justice', name_zh: '正義', number: 11,
    arcana: 'major', element: '天秤座',
    keywords: ['公正', '真相', '因果', '平衡'],
    upright: {
      meaning: '公正的結果即將到來，誠實面對將帶來應得的回報。',
      love: '關係中需要公平和誠實，雙方的需求都值得被重視。',
      career: '法律事務或合約問題將得到公正解決。',
      advice: '誠實行事，你所付出的終將以相應方式回來。'
    },
    reversed: {
      meaning: '不公正的對待或逃避責任，需要面對自己行為的後果。',
      love: '關係中的不平衡或欺騙需要被正視和解決。',
      career: '不公平的待遇或法律糾紛可能帶來麻煩。',
      advice: '逃避真相只會讓情況惡化，誠實面對更有力量。'
    },
    color: '#5B8DB8'
  },
  {
    id: 'major-12', name: 'The Hanged Man', name_zh: '倒吊者', number: 12,
    arcana: 'major', element: '海王星',
    keywords: ['暫停', '放下', '新視角', '犧牲'],
    upright: {
      meaning: '暫停行動，換個角度看問題，放下執著帶來頓悟。',
      love: '暫時的停滯期正在讓你看清關係的真實狀態。',
      career: '此刻不宜強行推進，等待和觀察比行動更有智慧。',
      advice: '接受目前的停滯狀態，其中蘊含著重要的領悟。'
    },
    reversed: {
      meaning: '不願放下或拖延造成的停滯，需要接受必要的犧牲。',
      love: '執著於過去阻礙了新的可能，試著放手。',
      career: '優柔寡斷造成機會流失，需要做出決定並採取行動。',
      advice: '你拒絕放下的東西正是讓你停滯的原因。'
    },
    color: '#5B8DB8'
  },
  {
    id: 'major-13', name: 'Death', name_zh: '死神', number: 13,
    arcana: 'major', element: '天蠍座',
    keywords: ['轉化', '結束', '新生', '改變'],
    upright: {
      meaning: '一個階段的結束是另一個新開始，擁抱必要的改變。',
      love: '關係正在經歷深刻的轉化，不必害怕改變的形態。',
      career: '舊的工作方式或職位即將結束，為新的可能讓路。',
      advice: '讓舊事物死去，新的生命才能誕生。'
    },
    reversed: {
      meaning: '抗拒必要的改變，或轉化過程停滯不前。',
      love: '無法放下已結束的關係，阻礙了新的可能。',
      career: '固守過時的方法，需要勇敢接受結束與轉變。',
      advice: '你對改變的抗拒正在消耗你的生命力。'
    },
    color: '#333650'
  },
  {
    id: 'major-14', name: 'Temperance', name_zh: '節制', number: 14,
    arcana: 'major', element: '射手座',
    keywords: ['平衡', '耐心', '調和', '節制'],
    upright: {
      meaning: '在對立面之間找到完美平衡，耐心的調和帶來和諧。',
      love: '關係中的平衡與妥協正在創造深厚的和諧連結。',
      career: '用穩定而持續的步伐前進，避免走極端。',
      advice: '適度和平衡是現在最需要的智慧。'
    },
    reversed: {
      meaning: '過度放縱或失去平衡，極端主義帶來不和諧。',
      love: '關係中的失衡需要被正視和重新調整。',
      career: '工作與生活失衡，或在事業上走了極端。',
      advice: '找回你內心的平靜中心，不要走極端。'
    },
    color: '#5BA8A0'
  },
  {
    id: 'major-15', name: 'The Devil', name_zh: '惡魔', number: 15,
    arcana: 'major', element: '摩羯座',
    keywords: ['束縛', '物質', '執念', '陰影'],
    upright: {
      meaning: '你被某種成癮、執念或有害模式所束縛，但鎖鏈其實是假的。',
      love: '有毒的依附關係或物質慾望正在主導情感決定。',
      career: '過度追求物質成功讓你陷入不健康的工作狀態。',
      advice: '認識到你的束縛，你比你以為的更自由。'
    },
    reversed: {
      meaning: '從有害的束縛中解脫，打破成癮模式，重獲自由。',
      love: '從有毒的關係中走出，重新掌握自己的情感自主權。',
      career: '走出不健康的工作環境或打破自我設限的思維。',
      advice: '你已看見鎖鏈的本質，是時候掙脫了。'
    },
    color: '#443355'
  },
  {
    id: 'major-16', name: 'The Tower', name_zh: '高塔', number: 16,
    arcana: 'major', element: '火星',
    keywords: ['突變', '崩塌', '覺醒', '混亂'],
    upright: {
      meaning: '建立在謊言或錯誤基礎上的事物正在崩塌，但廢墟中有解放。',
      love: '關係中的根基被動搖，誠實面對才能重建。',
      career: '意外的變動或失敗打碎了舊有的計劃，為更好的未來讓路。',
      advice: '不要抗拒崩塌，被摧毀的本不該存在。'
    },
    reversed: {
      meaning: '避免了危機，或正在延遲必要的崩塌，只是推遲了不可避免的事。',
      love: '正在努力維持一段已破裂的關係，需要評估是否值得。',
      career: '預感到即將到來的動盪，提前做好準備。',
      advice: '無論如何，轉變都在來的路上。'
    },
    color: '#C94444'
  },
  {
    id: 'major-17', name: 'The Star', name_zh: '星星', number: 17,
    arcana: 'major', element: '水瓶座',
    keywords: ['希望', '療癒', '靈感', '更新'],
    upright: {
      meaning: '在黑暗之後，希望與療癒的光芒引導你前行。',
      love: '傷痛後的療癒，新的希望在愛情中萌芽。',
      career: '靈感和創意重新流動，理想中的方向開始清晰。',
      advice: '相信宇宙在為你引路，保持開放與希望。'
    },
    reversed: {
      meaning: '失去希望或對未來感到絕望，需要重新找到內心的光。',
      love: '對愛情失去信心，需要療癒才能再次開放。',
      career: '對職業前景感到迷失，需要重新尋找方向和動力。',
      advice: '即使在最黑暗的時刻，也要尋找一顆星來指引。'
    },
    color: '#5B8DB8'
  },
  {
    id: 'major-18', name: 'The Moon', name_zh: '月亮', number: 18,
    arcana: 'major', element: '雙魚座',
    keywords: ['幻象', '潛意識', '恐懼', '直覺'],
    upright: {
      meaning: '深入你的潛意識，面對隱藏的恐懼與幻象，真相不如表面所見。',
      love: '關係中的不確定或誤解正在製造混亂，需要更清晰的溝通。',
      career: '信息不清晰或有隱藏議程，謹慎行事並相信直覺。',
      advice: '穿越幻象的迷霧，尋找隱藏在其後的真相。'
    },
    reversed: {
      meaning: '從混亂與幻象中走出，恐懼消散，真相漸漸清晰。',
      love: '誤解被解開，關係重新走向清晰和誠實。',
      career: '被隱藏的信息開始浮現，可以做出更明智的決定。',
      advice: '你正在從迷霧中走出，繼續前行。'
    },
    color: '#5B6B99'
  },
  {
    id: 'major-19', name: 'The Sun', name_zh: '太陽', number: 19,
    arcana: 'major', element: '太陽',
    keywords: ['喜悅', '成功', '活力', '清晰'],
    upright: {
      meaning: '喜悅與成功在最明亮的光芒下展現，此刻值得全心慶祝。',
      love: '愉快幸福的愛情關係，或孩子帶來的喜悅與滿足。',
      career: '成功在望，努力與才能獲得應有的認可與回報。',
      advice: '享受此刻的光輝，你完全值得這份成功與喜悅。'
    },
    reversed: {
      meaning: '喜悅被遮蔽或過度樂觀帶來了盲點，稍微回歸現實。',
      love: '幸福感暫時受到干擾，但陽光最終還是會回來。',
      career: '短暫的挫折不代表失敗，保持樂觀繼續努力。',
      advice: '不要讓暫時的烏雲讓你忘記太陽依然存在。'
    },
    color: '#E8C020'
  },
  {
    id: 'major-20', name: 'Judgement', name_zh: '審判', number: 20,
    arcana: 'major', element: '冥王星',
    keywords: ['覺醒', '審判', '重生', '召喚'],
    upright: {
      meaning: '聽見內心深處的呼喚，是時候做出影響生命的重大覺醒。',
      love: '對過去的關係或行為進行誠實的審視，從中解脫和重生。',
      career: '重要的轉型時刻，聆聽你的天命對你發出的呼喚。',
      advice: '放下過去的評判，帶著清醒的意識迎接新的自己。'
    },
    reversed: {
      meaning: '逃避自我評判或無法原諒自己，被過去所困。',
      love: '無法從過去的傷痛或錯誤中解脫，需要原諒自己和他人。',
      career: '錯過了重要的召喚，或害怕做出重大改變。',
      advice: '你需要原諒自己，才能真正重生。'
    },
    color: '#8B7CB8'
  },
  {
    id: 'major-21', name: 'The World', name_zh: '世界', number: 21,
    arcana: 'major', element: '土星',
    keywords: ['完成', '整合', '圓滿', '成就'],
    upright: {
      meaning: '一個重要旅程的圓滿完成，所有的努力都凝聚成這個高峰時刻。',
      love: '關係達到一個美好的完整，或找到了真正的靈魂伴侶。',
      career: '巨大的成就被實現，人生目標正在成功地被完成。',
      advice: '你已經做到了，慶祝這個里程碑，然後準備迎接下一段旅程。'
    },
    reversed: {
      meaning: '還差臨門一腳，或拒絕接受已完成的事物帶來的閉合。',
      love: '關係接近圓滿但遇到了最後的障礙，需要最後的努力。',
      career: '幾乎到達終點卻在最後一刻放棄，重新聚焦完成目標。',
      advice: '你比完成更近，不要在最後時刻放棄。'
    },
    color: '#C4902D'
  }
];

// Minor Arcana - simplified but comprehensive
const SUITS: { suit: Suit; suit_zh: string; element: string; color: string }[] = [
  { suit: 'cups', suit_zh: '聖杯', element: '水', color: '#5B8DB8' },
  { suit: 'wands', suit_zh: '權杖', element: '火', color: '#C94444' },
  { suit: 'swords', suit_zh: '寶劍', element: '風', color: '#8B9DB8' },
  { suit: 'pentacles', suit_zh: '星幣', element: '土', color: '#7CB87A' },
];

const RANK_NAMES: { rank: number; name: string; name_zh: string }[] = [
  { rank: 1, name: 'Ace', name_zh: '王牌' },
  { rank: 2, name: 'Two', name_zh: '二' },
  { rank: 3, name: 'Three', name_zh: '三' },
  { rank: 4, name: 'Four', name_zh: '四' },
  { rank: 5, name: 'Five', name_zh: '五' },
  { rank: 6, name: 'Six', name_zh: '六' },
  { rank: 7, name: 'Seven', name_zh: '七' },
  { rank: 8, name: 'Eight', name_zh: '八' },
  { rank: 9, name: 'Nine', name_zh: '九' },
  { rank: 10, name: 'Ten', name_zh: '十' },
  { rank: 11, name: 'Page', name_zh: '侍者' },
  { rank: 12, name: 'Knight', name_zh: '騎士' },
  { rank: 13, name: 'Queen', name_zh: '女王' },
  { rank: 14, name: 'King', name_zh: '國王' },
];

const MINOR_MEANINGS: Record<string, { upright: string; reversed: string }> = {
  'cups-1': { upright: '新的情感開始，直覺開啟，靈性連結', reversed: '情感壓抑，創意阻塞' },
  'cups-2': { upright: '深厚的夥伴關係，相互吸引，和諧連結', reversed: '關係不平衡，缺乏溝通' },
  'cups-3': { upright: '慶祝，友誼，豐收，社群喜悅', reversed: '過度放縱，三角關係' },
  'cups-4': { upright: '沉思冥想，不滿足，內省', reversed: '錯過機會，漠不關心' },
  'cups-5': { upright: '悲傷，失落，後悔，但仍有希望', reversed: '從失落中恢復，接受' },
  'cups-6': { upright: '童年記憶，懷舊，純真，善意', reversed: '沉溺過去，不切實際' },
  'cups-7': { upright: '幻想，選擇太多，白日夢', reversed: '清醒面對現實，做出決定' },
  'cups-8': { upright: '放棄，轉身離開，尋找更深意義', reversed: '害怕改變，拖延' },
  'cups-9': { upright: '滿足，幸福，願望成真', reversed: '不滿足，自我放縱' },
  'cups-10': { upright: '幸福圓滿，家庭和諧，夢想實現', reversed: '家庭糾紛，理想破滅' },
  'cups-11': { upright: '好消息，直覺強烈，情感探索', reversed: '壞消息，情緒操控' },
  'cups-12': { upright: '浪漫行動，騎士精神，理想主義', reversed: '幻想，情緒不穩定' },
  'cups-13': { upright: '同理心，直覺，情感成熟', reversed: '情緒操控，不安全感' },
  'cups-14': { upright: '情感掌控，成熟，外交智慧', reversed: '情感冷漠，操控' },
  'wands-1': { upright: '靈感，新的開始，創造力爆發', reversed: '延遲，缺乏方向' },
  'wands-2': { upright: '計劃未來，個人力量，發現', reversed: '缺乏計劃，恐懼未知' },
  'wands-3': { upright: '擴張，預見，長途旅行', reversed: '阻礙，延誤，缺乏遠見' },
  'wands-4': { upright: '慶祝，和諧，家園，穩定', reversed: '不穩定，家庭衝突' },
  'wands-5': { upright: '競爭，衝突，多元觀點', reversed: '避免衝突，尋求和平' },
  'wands-6': { upright: '勝利，公眾認可，進步', reversed: '自我懷疑，不被認可' },
  'wands-7': { upright: '挑戰，競爭，堅守立場', reversed: '不堅定，讓步' },
  'wands-8': { upright: '快速行動，迅速進展，旅行', reversed: '延誤，拖延，混亂' },
  'wands-9': { upright: '韌性，勇氣，堅持到底', reversed: '不堅定，猶豫' },
  'wands-10': { upright: '承擔過多，壓力，責任沉重', reversed: '放下重擔，授權' },
  'wands-11': { upright: '熱情，探索，自由冒險', reversed: '魯莽，衝動' },
  'wands-12': { upright: '能量，勇氣，冒險精神', reversed: '衝動，缺乏耐心' },
  'wands-13': { upright: '領導力，獨立，成熟的願景', reversed: '控制慾，缺乏耐心' },
  'wands-14': { upright: '成功，領袖魅力，企業家精神', reversed: '衝動，霸道' },
  'swords-1': { upright: '真相，清晰，突破，智識', reversed: '混亂，缺乏清晰' },
  'swords-2': { upright: '僵局，難以抉擇，迴避衝突', reversed: '資訊洩露，決策被迫' },
  'swords-3': { upright: '心痛，悲傷，傷痛', reversed: '走出痛苦，療癒' },
  'swords-4': { upright: '休息，恢復，冥想靜思', reversed: '焦慮，靜不下來' },
  'swords-5': { upright: '衝突，失敗，空洞的勝利', reversed: '和解，原諒' },
  'swords-6': { upright: '轉換，離開困境，過渡', reversed: '無法前進，抗拒改變' },
  'swords-7': { upright: '欺騙，策略，秘密行動', reversed: '被揭穿，承認錯誤' },
  'swords-8': { upright: '束縛，限制，受害者心態', reversed: '解放，重獲控制' },
  'swords-9': { upright: '焦慮，惡夢，痛苦', reversed: '從焦慮中解脫，希望' },
  'swords-10': { upright: '痛苦的結局，背叛，但是轉機', reversed: '復原，重生' },
  'swords-11': { upright: '好奇，洞察，溝通', reversed: '八卦，說閒話' },
  'swords-12': { upright: '行動，決心，英雄主義', reversed: '魯莽，衝動' },
  'swords-13': { upright: '智識，清晰，直接溝通', reversed: '冷漠，苛刻' },
  'swords-14': { upright: '智慧，權威，道德判斷', reversed: '殘酷，專制' },
  'pentacles-1': { upright: '新的機遇，物質開始，繁榮', reversed: '錯失機遇，物質損失' },
  'pentacles-2': { upright: '平衡，適應，靈活', reversed: '失去平衡，財務問題' },
  'pentacles-3': { upright: '團隊合作，技術精進，認可', reversed: '缺乏協作，工作質量差' },
  'pentacles-4': { upright: '節儉，穩定，保守持有', reversed: '囤積，物質主義' },
  'pentacles-5': { upright: '財務困難，物質匱乏，孤立', reversed: '走出困境，財務復原' },
  'pentacles-6': { upright: '慷慨，分享，財富流動', reversed: '不平等，自私' },
  'pentacles-7': { upright: '評估，耐心，長期投資', reversed: '缺乏遠見，急功近利' },
  'pentacles-8': { upright: '技藝精進，專注，工匠精神', reversed: '缺乏熟練，業餘' },
  'pentacles-9': { upright: '豐盛，自給自足，優雅', reversed: '過度物質主義，虛假繁榮' },
  'pentacles-10': { upright: '傳承，家族財富，長期穩定', reversed: '家族衝突，財產糾紛' },
  'pentacles-11': { upright: '實際，物質機遇，勤勞', reversed: '缺乏實際，浮躁' },
  'pentacles-12': { upright: '腳踏實地，可靠，耐心', reversed: '固執，停滯' },
  'pentacles-13': { upright: '物質安全，實際，豐盛', reversed: '不安全感，物質執著' },
  'pentacles-14': { upright: '財富，企業，成熟判斷', reversed: '貪婪，守財奴' },
};

function generateMinorArcana(): TarotCard[] {
  const cards: TarotCard[] = [];
  for (const suitInfo of SUITS) {
    for (const rankInfo of RANK_NAMES) {
      const key = `${suitInfo.suit}-${rankInfo.rank}`;
      const meanings = MINOR_MEANINGS[key] || {
        upright: '正向能量流動，積極前進',
        reversed: '能量受阻，需要重新評估'
      };
      cards.push({
        id: `${suitInfo.suit}-${rankInfo.rank}`,
        name: `${rankInfo.name} of ${suitInfo.suit.charAt(0).toUpperCase() + suitInfo.suit.slice(1)}`,
        name_zh: `${suitInfo.suit_zh}${rankInfo.name_zh}`,
        number: rankInfo.rank,
        arcana: 'minor',
        suit: suitInfo.suit,
        element: suitInfo.element,
        keywords: meanings.upright.split('，').slice(0, 3),
        upright: {
          meaning: meanings.upright,
          love: '感情方面展現' + meanings.upright.split('，')[0] + '的特質。',
          career: '事業上呈現' + meanings.upright.split('，')[0] + '的能量。',
          advice: meanings.upright,
        },
        reversed: {
          meaning: meanings.reversed,
          love: '感情方面出現' + meanings.reversed.split('，')[0] + '的狀況。',
          career: '事業上面臨' + meanings.reversed.split('，')[0] + '的挑戰。',
          advice: meanings.reversed,
        },
        color: suitInfo.color,
      });
    }
  }
  return cards;
}

export const MINOR_ARCANA = generateMinorArcana();
export const ALL_CARDS = [...MAJOR_ARCANA, ...MINOR_ARCANA];
