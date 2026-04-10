const riskRules = [
  { label: '현재 잔액 < 예정 출금액', score: '+40점' },
  { label: '최근 30일 자동이체 실패 이력 존재', score: '+20점' },
  { label: '최근 급여 미입금 또는 고정수입 미확인', score: '+20점' },
  { label: '최근 7일 소비가 30일 평균보다 급증', score: '+10점' },
  { label: '결제일까지 3일 이내', score: '+10점' },
  { label: '금리 절감/대환 가능성 존재', score: '별도 코칭 시나리오' }
];

const scenarios = [
  {
    id: 'A',s
    name: '고객 A · 단순 잔액 부족형',
    customer: '김가상',
    dueDate: '2026-04-15',
    dueAmount: 180000,
    currentBalance: 90000,
    avgBalance7d: 112000,
    avgBalance30d: 240000,
    spending7d: 180000,
    spending30dAvg: 120000,
    autoDebitFail30d: 1,
    salaryReceived: false,
    salaryDay: 25,
    shortage: 90000,
    riskScore: 82,
    riskLevel: 'HIGH',
    reasons: ['잔액 부족', '급여 미입금', '자동이체 실패 이력'],
    actions: [
      { label: '9만원 충전 안내', type: 'primary' },
      { label: '결제계좌 변경', type: 'warn' },
      { label: '상환일 캘린더 등록', type: 'secondary' }
    ],
    messages: {
      'D-7': {
        headline: '상환 준비가 필요합니다',
        message: '7일 후 대출이자 180,000원이 출금될 예정입니다. 현재 패턴상 잔액이 부족해질 가능성이 있어 미리 준비를 권장합니다.'
      },
      'D-3': {
        headline: '잔액 부족 가능성이 높습니다',
        message: '3일 후 대출이자 출금 예정입니다. 현재 잔액과 최근 입금 패턴 기준으로 90,000원 부족이 예상됩니다.'
      },
      'D-1': {
        headline: '오늘 충전이 필요합니다',
        message: '내일 오전 자동출금 예정입니다. 지금 90,000원을 충전하면 연체를 예방할 수 있습니다.'
      }
    },
    alertStatus: '발송 완료',
    actionStatus: '미조치',
    narrative: '단기 유동성 부족이 주요 원인인 고객입니다. 결제일이 가까워질수록 문구를 강화하고, 고객이 바로 행동할 수 있도록 부족 금액과 충전 유도 버튼을 함께 제공합니다.'
  },
  {
    id: 'B',
    name: '고객 B · 금리 부담 완화형',
    customer: '이샘플',
    dueDate: '2026-04-18',
    dueAmount: 260000,
    currentBalance: 420000,
    avgBalance7d: 445000,
    avgBalance30d: 390000,
    spending7d: 90000,
    spending30dAvg: 110000,
    autoDebitFail30d: 0,
    salaryReceived: true,
    salaryDay: 21,
    shortage: 0,
    riskScore: 58,
    riskLevel: 'MEDIUM',
    reasons: ['상환 부담 높음', '금리 절감 가능성 존재'],
    actions: [
      { label: '금리인하요구권 가능성 조회', type: 'primary' },
      { label: '대환 가능성 확인', type: 'secondary' },
      { label: '예상 절감액 보기', type: 'warn' }
    ],
    messages: {
      'D-7': {
        headline: '상환 부담을 낮출 수 있습니다',
        message: '최근 거래실적과 상환 이력 기준으로 금리 절감 가능성이 있습니다. 다음 상환 전에 조건을 점검해보세요.'
      },
      'D-3': {
        headline: '이자 절감 기회를 확인해보세요',
        message: '현재 상환은 가능하지만 더 낮은 이율 적용 가능성이 있습니다. 예상 절감액을 확인할 수 있습니다.'
      },
      'D-1': {
        headline: '상환 전 금리 조건 점검',
        message: '내일 상환 전 금리인하요구권 또는 대환 가능성을 조회하면 장기 부담을 줄이는 데 도움이 됩니다.'
      }
    },
    alertStatus: '발송 완료',
    actionStatus: '조회 완료',
    narrative: '당장 연체 가능성은 높지 않지만 장기적으로 금리 부담이 큰 고객입니다. 상환 지원을 통해 미래 연체 가능성을 낮추는 코칭형 서비스 시나리오입니다.'
  },
  {
    id: 'C',
    name: '고객 C · 직원 우선관리형',
    customer: '박테스트',
    dueDate: '2026-04-13',
    dueAmount: 320000,
    currentBalance: 140000,
    avgBalance7d: 155000,
    avgBalance30d: 265000,
    spending7d: 240000,
    spending30dAvg: 150000,
    autoDebitFail30d: 2,
    salaryReceived: false,
    salaryDay: 25,
    shortage: 180000,
    riskScore: 91,
    riskLevel: 'HIGH',
    reasons: ['자동이체 2회 실패', '최근 소비 급증', '잔액 부족', '급여 미입금'],
    actions: [
      { label: '우선관리 대상 등록', type: 'primary' },
      { label: '상담 안내 발송', type: 'warn' },
      { label: '상환지원 상품 안내', type: 'secondary' }
    ],
    messages: {
      'D-7': {
        headline: '상환 리스크가 감지되었습니다',
        message: '최근 자동이체 실패와 잔액 하락이 확인되었습니다. 상환 예정일 전에 자금 계획 점검이 필요합니다.'
      },
      'D-3': {
        headline: '고위험 고객으로 분류되었습니다',
        message: '3일 내 출금 예정 금액 대비 잔액이 부족하며 최근 소비가 증가했습니다. 상담 또는 상환지원 안내가 필요합니다.'
      },
      'D-1': {
        headline: '즉시 조치가 필요합니다',
        message: '내일 자동출금 실패 가능성이 매우 높습니다. 180,000원 충전 또는 상담 연결을 권장합니다.'
      }
    },
    alertStatus: '발송 완료',
    actionStatus: '상담 필요',
    narrative: '단순 알림만으로 해결되지 않을 가능성이 높은 고위험 고객입니다. 직원용 대시보드에서 우선관리 대상으로 보여주고 상담 프로세스와 연결하는 시나리오입니다.'
  }
];

let currentView = 'overview';
let currentScenario = scenarios[0];
let currentStage = 'D-7';

const viewTitleEl = document.getElementById('viewTitle');
const scenarioSelect = document.getElementById('scenarioSelect');
const navBtns = document.querySelectorAll('.nav-btn');
const timeBtns = document.querySelectorAll('.time-btn');
const rulesList = document.getElementById('rulesList');

function formatCurrency(value) {
  return `${value.toLocaleString('ko-KR')}원`;
}

function riskClass(level) {
  if (level === 'HIGH') return 'risk-high';
  if (level === 'MEDIUM') return 'risk-medium';
  return 'risk-low';
}

function riskText(level) {
  if (level === 'HIGH') return '고위험';
  if (level === 'MEDIUM') return '중위험';
  return '저위험';
}

function renderRules() {
  rulesList.innerHTML = riskRules.map(rule => `<li>${rule.label} <strong>${rule.score}</strong></li>`).join('');
}

function renderScenarioOptions() {
  scenarioSelect.innerHTML = scenarios.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
}

function renderOverview() {
  const highRiskCount = scenarios.filter(s => s.riskLevel === 'HIGH').length;
  const alertCount = scenarios.length;
  const shortageSum = scenarios.reduce((acc, cur) => acc + cur.shortage, 0);
  document.getElementById('heroHighRisk').textContent = `${highRiskCount}명`;
  document.getElementById('heroAlerts').textContent = `${alertCount}건`;
  document.getElementById('heroShortage').textContent = formatCurrency(shortageSum);
}

function renderCustomer() {
  const scenario = currentScenario;
  const message = scenario.messages[currentStage];
  document.getElementById('custName').textContent = scenario.customer;
  const riskBadge = document.getElementById('riskBadge');
  riskBadge.textContent = `${riskText(scenario.riskLevel)} · ${scenario.riskScore}점`;
  riskBadge.className = `risk-pill ${riskClass(scenario.riskLevel)}`;
  document.getElementById('stagePill').textContent = currentStage;
  document.getElementById('alertHeadline').textContent = message.headline;
  document.getElementById('alertMessage').textContent = message.message;
  document.getElementById('dueAmount').textContent = formatCurrency(scenario.dueAmount);
  document.getElementById('currentBalance').textContent = formatCurrency(scenario.currentBalance);
  document.getElementById('shortageAmount').textContent = formatCurrency(scenario.shortage);
  document.getElementById('scenarioNarrative').textContent = scenario.narrative;

  const customerActions = document.getElementById('customerActions');
  customerActions.innerHTML = scenario.actions.map(action => {
    const className = action.type === 'secondary' ? 'secondary' : action.type === 'warn' ? 'warn' : '';
    return `<button class="action-chip ${className}">${action.label}</button>`;
  }).join('');

  const detailItems = [
    ['예정 출금일', scenario.dueDate],
    ['최근 7일 평균 잔액', formatCurrency(scenario.avgBalance7d)],
    ['최근 30일 평균 잔액', formatCurrency(scenario.avgBalance30d)],
    ['최근 7일 소비', formatCurrency(scenario.spending7d)],
    ['자동이체 실패(30일)', `${scenario.autoDebitFail30d}회`],
    ['급여 입금 여부', scenario.salaryReceived ? '확인' : '미확인']
  ];

  document.getElementById('detailGrid').innerHTML = detailItems.map(([label, value]) => `
    <div class="detail-item">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join('');
}

function renderDashboard() {
  const stats = [
    ['전체 시나리오 고객', `${scenarios.length}명`],
    ['고위험 고객', `${scenarios.filter(s => s.riskLevel === 'HIGH').length}명`],
    ['알림 발송 완료', `${scenarios.filter(s => s.alertStatus === '발송 완료').length}건`],
    ['직원 개입 필요', `${scenarios.filter(s => s.actionStatus.includes('상담') || s.actionStatus.includes('미조치')).length}건`]
  ];

  document.getElementById('dashboardStats').innerHTML = stats.map(([label, value]) => `
    <div class="stat-box">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join('');

  document.getElementById('dashboardTable').innerHTML = scenarios.map(s => `
    <tr>
      <td><strong>${s.customer}</strong><br/><span class="eyebrow">${s.name.split('·')[1].trim()}</span></td>
      <td><span class="table-tag ${s.riskLevel === 'HIGH' ? 'tag-high' : s.riskLevel === 'MEDIUM' ? 'tag-medium' : 'tag-low'}">${riskText(s.riskLevel)}</span></td>
      <td>${s.dueDate}</td>
      <td>${formatCurrency(s.shortage)}</td>
      <td>${s.reasons.join(', ')}</td>
      <td>${s.alertStatus}</td>
      <td>${s.actionStatus}</td>
    </tr>
  `).join('');
}

function renderResults() {
  const without = 6.2;
  const withAlert = 4.1;
  const delta = (without - withAlert).toFixed(1);
  document.getElementById('rateWithout').textContent = `${without}%`;
  document.getElementById('rateWith').textContent = `${withAlert}%`;
  document.getElementById('deltaRate').textContent = `${delta}%p`;
  document.getElementById('barWithout').style.width = `${without * 10}%`;
  document.getElementById('barWith').style.width = `${withAlert * 10}%`;
}

function renderAll() {
  renderOverview();
  renderCustomer();
  renderDashboard();
  renderResults();
}

function setView(view) {
  currentView = view;
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  document.getElementById(view).classList.add('active');
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  const titleMap = {
    overview: '서비스 개요',
    customer: '고객 알림 화면',
    dashboard: '직원 대시보드',
    results: '성과 시뮬레이션'
  };
  viewTitleEl.textContent = titleMap[view];
}

function setStage(stage) {
  currentStage = stage;
  timeBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.stage === stage));
  renderCustomer();
}

function setScenario(id) {
  currentScenario = scenarios.find(s => s.id === id) || scenarios[0];
  renderCustomer();
}

navBtns.forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
timeBtns.forEach(btn => btn.addEventListener('click', () => setStage(btn.dataset.stage)));
scenarioSelect.addEventListener('change', (e) => setScenario(e.target.value));

document.getElementById('runSimulationBtn').addEventListener('click', () => {
  renderAll();
  setView('customer');
  const alertCard = document.getElementById('alertCard');
  alertCard.animate(
    [
      { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' },
      { transform: 'scale(1.02)', boxShadow: '0 10px 30px rgba(52,88,214,0.18)' },
      { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' }
    ],
    { duration: 700, easing: 'ease-out' }
  );
});

renderRules();
renderScenarioOptions();
renderAll();
setScenario(scenarios[0].id);
setStage('D-7');
setView('overview');
