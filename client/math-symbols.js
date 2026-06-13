// client/math-symbols.js — 수식 입력 도우미 기호/템플릿 데이터 (v0.4.3)
//
// 생성: math-input-design 워크플로 택소노미 → 검증된 KaTeX 0.16.21 명령만.
// insert 안의 "•"(U+2022)는 커서/탭스톱 슬롯 마커 (삽입 시 제거되고 Tab으로 순회).
// $ 구분자는 넣지 않음 — app.js의 insertMathSnippet이 인라인/디스플레이를 처리.
// display_block:true = 큰 구조(행렬/적분 등) → $$…$$ 디스플레이로 감싸는 게 자연스러움.

export const MATH_SYMBOLS = [
  {
    "id": "greek-lower",
    "label": "그리스 문자 (소문자)",
    "emoji": "α",
    "entries": [
      {
        "display": "α",
        "insert": "\\alpha",
        "tip": "alpha"
      },
      {
        "display": "β",
        "insert": "\\beta",
        "tip": "beta"
      },
      {
        "display": "γ",
        "insert": "\\gamma",
        "tip": "gamma"
      },
      {
        "display": "δ",
        "insert": "\\delta",
        "tip": "delta"
      },
      {
        "display": "ε",
        "insert": "\\epsilon",
        "tip": "epsilon"
      },
      {
        "display": "ϵ",
        "insert": "\\varepsilon",
        "tip": "varepsilon (변형)"
      },
      {
        "display": "ζ",
        "insert": "\\zeta",
        "tip": "zeta"
      },
      {
        "display": "η",
        "insert": "\\eta",
        "tip": "eta"
      },
      {
        "display": "θ",
        "insert": "\\theta",
        "tip": "theta"
      },
      {
        "display": "ϑ",
        "insert": "\\vartheta",
        "tip": "vartheta (변형)"
      },
      {
        "display": "ι",
        "insert": "\\iota",
        "tip": "iota"
      },
      {
        "display": "κ",
        "insert": "\\kappa",
        "tip": "kappa"
      },
      {
        "display": "λ",
        "insert": "\\lambda",
        "tip": "lambda"
      },
      {
        "display": "μ",
        "insert": "\\mu",
        "tip": "mu"
      },
      {
        "display": "ν",
        "insert": "\\nu",
        "tip": "nu"
      },
      {
        "display": "ξ",
        "insert": "\\xi",
        "tip": "xi"
      },
      {
        "display": "π",
        "insert": "\\pi",
        "tip": "pi"
      },
      {
        "display": "ϖ",
        "insert": "\\varpi",
        "tip": "varpi (변형)"
      },
      {
        "display": "ρ",
        "insert": "\\rho",
        "tip": "rho"
      },
      {
        "display": "ϱ",
        "insert": "\\varrho",
        "tip": "varrho (변형)"
      },
      {
        "display": "σ",
        "insert": "\\sigma",
        "tip": "sigma"
      },
      {
        "display": "ς",
        "insert": "\\varsigma",
        "tip": "varsigma (변형)"
      },
      {
        "display": "τ",
        "insert": "\\tau",
        "tip": "tau"
      },
      {
        "display": "υ",
        "insert": "\\upsilon",
        "tip": "upsilon"
      },
      {
        "display": "φ",
        "insert": "\\phi",
        "tip": "phi"
      },
      {
        "display": "ϕ",
        "insert": "\\varphi",
        "tip": "varphi (변형)"
      },
      {
        "display": "χ",
        "insert": "\\chi",
        "tip": "chi"
      },
      {
        "display": "ψ",
        "insert": "\\psi",
        "tip": "psi"
      },
      {
        "display": "ω",
        "insert": "\\omega",
        "tip": "omega"
      }
    ]
  },
  {
    "id": "greek-upper",
    "label": "그리스 문자 (대문자)",
    "emoji": "Ω",
    "entries": [
      {
        "display": "Γ",
        "insert": "\\Gamma",
        "tip": "Gamma"
      },
      {
        "display": "Δ",
        "insert": "\\Delta",
        "tip": "Delta — 변화량/라플라시안"
      },
      {
        "display": "Θ",
        "insert": "\\Theta",
        "tip": "Theta — 빅세타 점근"
      },
      {
        "display": "Λ",
        "insert": "\\Lambda",
        "tip": "Lambda — 고윳값 대각행렬"
      },
      {
        "display": "Ξ",
        "insert": "\\Xi",
        "tip": "Xi"
      },
      {
        "display": "Π",
        "insert": "\\Pi",
        "tip": "Pi — 곱(대문자)"
      },
      {
        "display": "Σ",
        "insert": "\\Sigma",
        "tip": "Sigma — 공분산행렬"
      },
      {
        "display": "Υ",
        "insert": "\\Upsilon",
        "tip": "Upsilon"
      },
      {
        "display": "Φ",
        "insert": "\\Phi",
        "tip": "Phi — 표준정규 CDF"
      },
      {
        "display": "Ψ",
        "insert": "\\Psi",
        "tip": "Psi"
      },
      {
        "display": "Ω",
        "insert": "\\Omega",
        "tip": "Omega — 표본공간"
      },
      {
        "display": "∇",
        "insert": "\\nabla",
        "tip": "nabla — gradient 연산자"
      },
      {
        "display": "ℓ",
        "insert": "\\ell",
        "tip": "손글씨 ell — 손실/길이"
      }
    ]
  },
  {
    "id": "relations",
    "label": "관계 연산자",
    "emoji": "≤",
    "entries": [
      {
        "display": "≤",
        "insert": "\\le",
        "tip": "less or equal"
      },
      {
        "display": "≥",
        "insert": "\\ge",
        "tip": "greater or equal"
      },
      {
        "display": "≪",
        "insert": "\\ll",
        "tip": "much less"
      },
      {
        "display": "≫",
        "insert": "\\gg",
        "tip": "much greater"
      },
      {
        "display": "≠",
        "insert": "\\ne",
        "tip": "not equal"
      },
      {
        "display": "≈",
        "insert": "\\approx",
        "tip": "approximately"
      },
      {
        "display": "≃",
        "insert": "\\simeq",
        "tip": "asymptotically equal"
      },
      {
        "display": "≅",
        "insert": "\\cong",
        "tip": "congruent / isomorphic"
      },
      {
        "display": "≡",
        "insert": "\\equiv",
        "tip": "equivalent / identical"
      },
      {
        "display": "∝",
        "insert": "\\propto",
        "tip": "proportional to"
      },
      {
        "display": "≜",
        "insert": "\\triangleq",
        "tip": "정의에 의해 같음"
      },
      {
        "display": ":=",
        "insert": "\\coloneqq",
        "tip": "정의 (colon-equals)"
      },
      {
        "display": "=:",
        "insert": "\\eqqcolon",
        "tip": "정의 (equals-colon)"
      },
      {
        "display": "≺",
        "insert": "\\prec",
        "tip": "precedes (순서)"
      },
      {
        "display": "≻",
        "insert": "\\succ",
        "tip": "succeeds (순서)"
      },
      {
        "display": "⪯",
        "insert": "\\preceq",
        "tip": "준순서 ⪯ (PSD 순서)"
      },
      {
        "display": "⪰",
        "insert": "\\succeq",
        "tip": "준순서 ⪰ (PSD 순서)"
      },
      {
        "display": "≐",
        "insert": "\\doteq",
        "tip": "근사정의 같음"
      },
      {
        "display": "≍",
        "insert": "\\asymp",
        "tip": "asymptotic"
      },
      {
        "display": "⊥",
        "insert": "\\perp",
        "tip": "수직 / 독립"
      },
      {
        "display": "∥",
        "insert": "\\parallel",
        "tip": "평행"
      }
    ]
  },
  {
    "id": "binops",
    "label": "산술·이항 연산자",
    "emoji": "⊗",
    "entries": [
      {
        "display": "×",
        "insert": "\\times",
        "tip": "곱 / 데카르트곱"
      },
      {
        "display": "÷",
        "insert": "\\div",
        "tip": "나눗셈"
      },
      {
        "display": "·",
        "insert": "\\cdot",
        "tip": "점곱 (스칼라)"
      },
      {
        "display": "∗",
        "insert": "\\ast",
        "tip": "별표 / 합성곱"
      },
      {
        "display": "⊛",
        "insert": "\\circledast",
        "tip": "순환 합성곱"
      },
      {
        "display": "∘",
        "insert": "\\circ",
        "tip": "함수 합성 / 아다마르(원소곱)"
      },
      {
        "display": "⊙",
        "insert": "\\odot",
        "tip": "아다마르 원소곱"
      },
      {
        "display": "⊗",
        "insert": "\\otimes",
        "tip": "텐서곱 / 크로네커곱"
      },
      {
        "display": "⊕",
        "insert": "\\oplus",
        "tip": "직합"
      },
      {
        "display": "±",
        "insert": "\\pm",
        "tip": "plus-minus"
      },
      {
        "display": "∓",
        "insert": "\\mp",
        "tip": "minus-plus"
      },
      {
        "display": "⌊ ⌋",
        "insert": "\\lfloor • \\rfloor",
        "tip": "floor (내림)"
      },
      {
        "display": "⌈ ⌉",
        "insert": "\\lceil • \\rceil",
        "tip": "ceil (올림)"
      },
      {
        "display": "a/b",
        "insert": "\\frac{•}{•}",
        "tip": "분수",
        "display_block": true
      },
      {
        "display": "√",
        "insert": "\\sqrt{•}",
        "tip": "제곱근"
      },
      {
        "display": "ⁿ√",
        "insert": "\\sqrt[•]{•}",
        "tip": "n제곱근"
      },
      {
        "display": "xⁿ",
        "insert": "•^{•}",
        "tip": "위첨자 (지수)"
      },
      {
        "display": "xₙ",
        "insert": "•_{•}",
        "tip": "아래첨자 (인덱스)"
      },
      {
        "display": "xᵢⱼ",
        "insert": "•_{•}^{•}",
        "tip": "아래+위첨자"
      }
    ]
  },
  {
    "id": "arrows",
    "label": "화살표",
    "emoji": "→",
    "entries": [
      {
        "display": "→",
        "insert": "\\to",
        "tip": "오른쪽 화살표 / 사상"
      },
      {
        "display": "←",
        "insert": "\\leftarrow",
        "tip": "왼쪽 화살표 / 대입"
      },
      {
        "display": "⟵",
        "insert": "\\longleftarrow",
        "tip": "긴 왼쪽 화살표"
      },
      {
        "display": "⟶",
        "insert": "\\longrightarrow",
        "tip": "긴 오른쪽 화살표"
      },
      {
        "display": "⇒",
        "insert": "\\Rightarrow",
        "tip": "함의 (implies)"
      },
      {
        "display": "⇐",
        "insert": "\\Leftarrow",
        "tip": "역함의"
      },
      {
        "display": "⇔",
        "insert": "\\iff",
        "tip": "필요충분 (iff)"
      },
      {
        "display": "↦",
        "insert": "\\mapsto",
        "tip": "maps to (원소 대응)"
      },
      {
        "display": "⟶ᶠ",
        "insert": "\\xrightarrow{•}",
        "tip": "라벨 붙은 화살표"
      },
      {
        "display": "↑",
        "insert": "\\uparrow",
        "tip": "위 화살표"
      },
      {
        "display": "↓",
        "insert": "\\downarrow",
        "tip": "아래 화살표 / 수렴"
      },
      {
        "display": "⇄",
        "insert": "\\rightleftarrows",
        "tip": "양방향 (왕복)"
      },
      {
        "display": "↗",
        "insert": "\\nearrow",
        "tip": "증가 추세"
      },
      {
        "display": "↘",
        "insert": "\\searrow",
        "tip": "감소 추세"
      },
      {
        "display": "⇀",
        "insert": "\\rightharpoonup",
        "tip": "약수렴"
      }
    ]
  },
  {
    "id": "big-ops",
    "label": "큰 연산자 (합·곱·적분)",
    "emoji": "∑",
    "entries": [
      {
        "display": "∑",
        "insert": "\\sum_{•}^{•} •",
        "tip": "합 (sum)",
        "display_block": true
      },
      {
        "display": "∏",
        "insert": "\\prod_{•}^{•} •",
        "tip": "곱 (product)",
        "display_block": true
      },
      {
        "display": "∐",
        "insert": "\\coprod_{•}^{•} •",
        "tip": "쌍대곱 (coproduct)",
        "display_block": true
      },
      {
        "display": "∫",
        "insert": "\\int_{•}^{•} • \\, d•",
        "tip": "정적분",
        "display_block": true
      },
      {
        "display": "∬",
        "insert": "\\iint_{•} • \\, dA",
        "tip": "이중적분",
        "display_block": true
      },
      {
        "display": "∭",
        "insert": "\\iiint_{•} • \\, dV",
        "tip": "삼중적분",
        "display_block": true
      },
      {
        "display": "∮",
        "insert": "\\oint_{•} • \\, d•",
        "tip": "선적분 (폐곡선)",
        "display_block": true
      },
      {
        "display": "⋃",
        "insert": "\\bigcup_{•}^{•} •",
        "tip": "합집합 (대)",
        "display_block": true
      },
      {
        "display": "⋂",
        "insert": "\\bigcap_{•}^{•} •",
        "tip": "교집합 (대)",
        "display_block": true
      },
      {
        "display": "⨆",
        "insert": "\\bigsqcup_{•}^{•} •",
        "tip": "분리합집합"
      },
      {
        "display": "⨁",
        "insert": "\\bigoplus_{•}^{•} •",
        "tip": "직합 (대)"
      },
      {
        "display": "⨂",
        "insert": "\\bigotimes_{•}^{•} •",
        "tip": "텐서곱 (대)"
      },
      {
        "display": "⋁",
        "insert": "\\bigvee_{•}^{•} •",
        "tip": "논리합 (대) / 최대"
      },
      {
        "display": "⋀",
        "insert": "\\bigwedge_{•}^{•} •",
        "tip": "논리곱 (대) / 최소"
      },
      {
        "display": "lim",
        "insert": "\\lim_{• \\to •} •",
        "tip": "극한",
        "display_block": true
      },
      {
        "display": "limsup",
        "insert": "\\limsup_{•} •",
        "tip": "상극한"
      },
      {
        "display": "liminf",
        "insert": "\\liminf_{•} •",
        "tip": "하극한"
      }
    ]
  },
  {
    "id": "calculus",
    "label": "미적분·벡터해석",
    "emoji": "∂",
    "entries": [
      {
        "display": "d/dx",
        "insert": "\\frac{d•}{d•}",
        "tip": "전미분",
        "display_block": true
      },
      {
        "display": "∂/∂x",
        "insert": "\\frac{\\partial •}{\\partial •}",
        "tip": "편미분",
        "display_block": true
      },
      {
        "display": "∂²/∂x²",
        "insert": "\\frac{\\partial^2 •}{\\partial •^2}",
        "tip": "2계 편미분",
        "display_block": true
      },
      {
        "display": "∂",
        "insert": "\\partial",
        "tip": "편미분 기호"
      },
      {
        "display": "∇f",
        "insert": "\\nabla •",
        "tip": "gradient"
      },
      {
        "display": "∇·F",
        "insert": "\\nabla \\cdot •",
        "tip": "divergence (발산)"
      },
      {
        "display": "∇×F",
        "insert": "\\nabla \\times •",
        "tip": "curl (회전)"
      },
      {
        "display": "∇²",
        "insert": "\\nabla^2 •",
        "tip": "라플라시안"
      },
      {
        "display": "∇²f",
        "insert": "\\nabla^2_{•} •",
        "tip": "헤시안 (변수 명시)"
      },
      {
        "display": "dx",
        "insert": "\\, d•",
        "tip": "적분 미분소 (간격 포함)"
      },
      {
        "display": "f′",
        "insert": "•'",
        "tip": "도함수 (프라임)"
      },
      {
        "display": "∮",
        "insert": "\\oint_{•} • \\, d•",
        "tip": "폐선적분"
      },
      {
        "display": "∞",
        "insert": "\\infty",
        "tip": "무한대"
      },
      {
        "display": "∘ε",
        "insert": "\\to 0^{+}",
        "tip": "우극한 0으로"
      },
      {
        "display": "Df",
        "insert": "\\frac{D•}{D•}",
        "tip": "전도함수 / 야코비안 표기"
      },
      {
        "display": "Jacobian",
        "insert": "\\frac{\\partial(•)}{\\partial(•)}",
        "tip": "야코비안 행렬식",
        "display_block": true
      }
    ]
  },
  {
    "id": "sets-logic",
    "label": "집합·논리",
    "emoji": "∈",
    "entries": [
      {
        "display": "∈",
        "insert": "\\in",
        "tip": "원소"
      },
      {
        "display": "∉",
        "insert": "\\notin",
        "tip": "원소 아님"
      },
      {
        "display": "∋",
        "insert": "\\ni",
        "tip": "역원소"
      },
      {
        "display": "⊂",
        "insert": "\\subset",
        "tip": "진부분집합"
      },
      {
        "display": "⊆",
        "insert": "\\subseteq",
        "tip": "부분집합"
      },
      {
        "display": "⊃",
        "insert": "\\supset",
        "tip": "진초집합"
      },
      {
        "display": "⊇",
        "insert": "\\supseteq",
        "tip": "초집합"
      },
      {
        "display": "∪",
        "insert": "\\cup",
        "tip": "합집합"
      },
      {
        "display": "∩",
        "insert": "\\cap",
        "tip": "교집합"
      },
      {
        "display": "∖",
        "insert": "\\setminus",
        "tip": "차집합"
      },
      {
        "display": "∅",
        "insert": "\\emptyset",
        "tip": "공집합"
      },
      {
        "display": "⊥",
        "insert": "\\perp",
        "tip": "직교 / 독립"
      },
      {
        "display": "{ : }",
        "insert": "\\{\\, • \\mid • \\,\\}",
        "tip": "집합 빌더 표기"
      },
      {
        "display": "∀",
        "insert": "\\forall",
        "tip": "모든 (전칭)"
      },
      {
        "display": "∃",
        "insert": "\\exists",
        "tip": "존재 (존재)"
      },
      {
        "display": "∄",
        "insert": "\\nexists",
        "tip": "존재하지 않음"
      },
      {
        "display": "¬",
        "insert": "\\neg",
        "tip": "부정"
      },
      {
        "display": "∧",
        "insert": "\\land",
        "tip": "논리곱 (AND)"
      },
      {
        "display": "∨",
        "insert": "\\lor",
        "tip": "논리합 (OR)"
      },
      {
        "display": "∴",
        "insert": "\\therefore",
        "tip": "그러므로"
      },
      {
        "display": "∵",
        "insert": "\\because",
        "tip": "왜냐하면"
      },
      {
        "display": "|·|",
        "insert": "\\lvert • \\rvert",
        "tip": "절댓값 / 집합크기"
      },
      {
        "display": "∣",
        "insert": "\\mid",
        "tip": "조건/나눔 구분자"
      },
      {
        "display": "○",
        "insert": "\\aleph",
        "tip": "알레프 (기수)"
      }
    ]
  },
  {
    "id": "matrices",
    "label": "행렬·구조 (환경)",
    "emoji": "⎡⎤",
    "entries": [
      {
        "display": "( )",
        "insert": "\\begin{pmatrix} • & • \\\\ • & • \\end{pmatrix}",
        "tip": "pmatrix — 괄호 행렬",
        "display_block": true
      },
      {
        "display": "[ ]",
        "insert": "\\begin{bmatrix} • & • \\\\ • & • \\end{bmatrix}",
        "tip": "bmatrix — 대괄호 행렬",
        "display_block": true
      },
      {
        "display": "| |",
        "insert": "\\begin{vmatrix} • & • \\\\ • & • \\end{vmatrix}",
        "tip": "vmatrix — 행렬식",
        "display_block": true
      },
      {
        "display": "열벡터",
        "insert": "\\begin{bmatrix} • \\\\ • \\\\ • \\end{bmatrix}",
        "tip": "열벡터 (3성분)",
        "display_block": true
      },
      {
        "display": "행벡터",
        "insert": "\\begin{bmatrix} • & • & • \\end{bmatrix}",
        "tip": "행벡터 (3성분)",
        "display_block": true
      },
      {
        "display": "3×3",
        "insert": "\\begin{bmatrix} • & • & • \\\\ • & • & • \\\\ • & • & • \\end{bmatrix}",
        "tip": "3×3 행렬",
        "display_block": true
      },
      {
        "display": "⋱ 대각",
        "insert": "\\begin{bmatrix} • & & \\\\ & \\ddots & \\\\ & & • \\end{bmatrix}",
        "tip": "대각행렬 (⋱ 생략)",
        "display_block": true
      },
      {
        "display": "cases",
        "insert": "\\begin{cases} • & \\text{if } • \\\\ • & \\text{otherwise} \\end{cases}",
        "tip": "경우 분기 정의",
        "display_block": true
      },
      {
        "display": "aligned",
        "insert": "\\begin{aligned} • &= • \\\\ &= • \\end{aligned}",
        "tip": "여러 줄 정렬 (= 기준)",
        "display_block": true
      },
      {
        "display": "array",
        "insert": "\\begin{array}{cc} • & • \\\\ • & • \\end{array}",
        "tip": "array — 정렬 지정 표",
        "display_block": true
      },
      {
        "display": "⋯",
        "insert": "\\cdots",
        "tip": "가운데 점 생략"
      },
      {
        "display": "⋮",
        "insert": "\\vdots",
        "tip": "세로 생략"
      },
      {
        "display": "⋱",
        "insert": "\\ddots",
        "tip": "대각 생략"
      },
      {
        "display": "좌우괄호",
        "insert": "\\left( • \\right)",
        "tip": "자동 크기 괄호"
      },
      {
        "display": "⎰⎱",
        "insert": "\\underbrace{•}_{•}",
        "tip": "아래 중괄호 (주석)",
        "display_block": true
      },
      {
        "display": "⎴",
        "insert": "\\overbrace{•}^{•}",
        "tip": "위 중괄호 (주석)",
        "display_block": true
      }
    ]
  },
  {
    "id": "decorations",
    "label": "데코레이션 (모자·바·벡터)",
    "emoji": "x̂",
    "entries": [
      {
        "display": "x̂",
        "insert": "\\hat{•}",
        "tip": "hat — 추정값/단위벡터"
      },
      {
        "display": "x̄",
        "insert": "\\bar{•}",
        "tip": "bar — 평균/켤레"
      },
      {
        "display": "x⃗",
        "insert": "\\vec{•}",
        "tip": "vec — 벡터"
      },
      {
        "display": "x̃",
        "insert": "\\tilde{•}",
        "tip": "tilde — 근사/변형"
      },
      {
        "display": "ẋ",
        "insert": "\\dot{•}",
        "tip": "dot — 시간미분"
      },
      {
        "display": "ẍ",
        "insert": "\\ddot{•}",
        "tip": "ddot — 2계 시간미분"
      },
      {
        "display": "x̌",
        "insert": "\\check{•}",
        "tip": "check"
      },
      {
        "display": "x́",
        "insert": "\\acute{•}",
        "tip": "acute"
      },
      {
        "display": "x̀",
        "insert": "\\grave{•}",
        "tip": "grave"
      },
      {
        "display": "widehat",
        "insert": "\\widehat{•}",
        "tip": "넓은 hat (여러 글자)"
      },
      {
        "display": "widetilde",
        "insert": "\\widetilde{•}",
        "tip": "넓은 tilde (여러 글자)"
      },
      {
        "display": "overline",
        "insert": "\\overline{•}",
        "tip": "윗줄 (집합 닫힘/켤레)"
      },
      {
        "display": "underline",
        "insert": "\\underline{•}",
        "tip": "밑줄"
      },
      {
        "display": "x⃗→",
        "insert": "\\overrightarrow{•}",
        "tip": "위 오른쪽 화살표 (벡터)"
      },
      {
        "display": "x*",
        "insert": "•^{*}",
        "tip": "별표 위첨자 (최적/켤레)"
      },
      {
        "display": "x⁺",
        "insert": "•^{+}",
        "tip": "유사역행렬/양의 부분"
      }
    ]
  },
  {
    "id": "fonts",
    "label": "폰트·서체",
    "emoji": "ℝ",
    "entries": [
      {
        "display": "ℝ",
        "insert": "\\mathbb{R}",
        "tip": "실수 집합"
      },
      {
        "display": "ℕ",
        "insert": "\\mathbb{N}",
        "tip": "자연수"
      },
      {
        "display": "ℤ",
        "insert": "\\mathbb{Z}",
        "tip": "정수"
      },
      {
        "display": "ℚ",
        "insert": "\\mathbb{Q}",
        "tip": "유리수"
      },
      {
        "display": "ℂ",
        "insert": "\\mathbb{C}",
        "tip": "복소수"
      },
      {
        "display": "𝔼",
        "insert": "\\mathbb{E}",
        "tip": "기댓값 기호 (blackboard E)"
      },
      {
        "display": "ℙ",
        "insert": "\\mathbb{P}",
        "tip": "확률 기호"
      },
      {
        "display": "ℝⁿ",
        "insert": "\\mathbb{R}^{•}",
        "tip": "n차원 실벡터공간"
      },
      {
        "display": "ℝᵐˣⁿ",
        "insert": "\\mathbb{R}^{• \\times •}",
        "tip": "m×n 실행렬 공간"
      },
      {
        "display": "𝟙",
        "insert": "\\mathbb{1}",
        "tip": "지시함수 / 단위행렬"
      },
      {
        "display": "𝒜",
        "insert": "\\mathcal{•}",
        "tip": "calligraphic — 집합/공간/손실"
      },
      {
        "display": "𝒩",
        "insert": "\\mathcal{N}",
        "tip": "정규분포 (calligraphic N)"
      },
      {
        "display": "𝓛",
        "insert": "\\mathcal{L}",
        "tip": "손실/라그랑지안/우도"
      },
      {
        "display": "𝐱",
        "insert": "\\mathbf{•}",
        "tip": "bold — 벡터/행렬 (라틴)"
      },
      {
        "display": "𝛉",
        "insert": "\\boldsymbol{•}",
        "tip": "bold — 그리스/기호 벡터"
      },
      {
        "display": "𝔤",
        "insert": "\\mathfrak{•}",
        "tip": "fraktur — 리대수/이상"
      },
      {
        "display": "rm",
        "insert": "\\mathrm{•}",
        "tip": "로만체 (다중문자 변수명)"
      },
      {
        "display": "sf",
        "insert": "\\mathsf{•}",
        "tip": "산세리프"
      },
      {
        "display": "text",
        "insert": "\\text{•}",
        "tip": "본문 텍스트 (수식 안 설명)"
      }
    ]
  },
  {
    "id": "ml-shortcuts",
    "label": "ML 자주 쓰는 단축",
    "emoji": "𝔼",
    "entries": [
      {
        "display": "𝔼[ ]",
        "insert": "\\mathbb{E}\\!\\left[ • \\right]",
        "tip": "기댓값"
      },
      {
        "display": "𝔼_{x~p}",
        "insert": "\\mathbb{E}_{• \\sim •}\\!\\left[ • \\right]",
        "tip": "분포 하 기댓값",
        "display_block": true
      },
      {
        "display": "Var",
        "insert": "\\operatorname{Var}\\!\\left[ • \\right]",
        "tip": "분산"
      },
      {
        "display": "Cov",
        "insert": "\\operatorname{Cov}\\!\\left[ •,\\, • \\right]",
        "tip": "공분산"
      },
      {
        "display": "~",
        "insert": "• \\sim •",
        "tip": "분포를 따름 (sampled from)"
      },
      {
        "display": "argmax",
        "insert": "\\operatorname*{arg\\,max}_{•} •",
        "tip": "최댓값 인자",
        "display_block": true
      },
      {
        "display": "argmin",
        "insert": "\\operatorname*{arg\\,min}_{•} •",
        "tip": "최솟값 인자",
        "display_block": true
      },
      {
        "display": "max",
        "insert": "\\max_{•} •",
        "tip": "최댓값"
      },
      {
        "display": "min",
        "insert": "\\min_{•} •",
        "tip": "최솟값"
      },
      {
        "display": "sup",
        "insert": "\\sup_{•} •",
        "tip": "상한"
      },
      {
        "display": "inf",
        "insert": "\\inf_{•} •",
        "tip": "하한"
      },
      {
        "display": "softmax",
        "insert": "\\operatorname{softmax}\\!\\left( • \\right)",
        "tip": "소프트맥스"
      },
      {
        "display": "KL(‖)",
        "insert": "D_{\\mathrm{KL}}\\!\\left( • \\,\\|\\, • \\right)",
        "tip": "KL 발산",
        "display_block": true
      },
      {
        "display": "‖·‖",
        "insert": "\\lVert • \\rVert",
        "tip": "노름 (norm)"
      },
      {
        "display": "‖·‖₂",
        "insert": "\\lVert • \\rVert_{2}",
        "tip": "L2 노름"
      },
      {
        "display": "‖·‖_F",
        "insert": "\\lVert • \\rVert_{F}",
        "tip": "프로베니우스 노름"
      },
      {
        "display": "xᵀ",
        "insert": "•^{\\top}",
        "tip": "전치 (transpose)"
      },
      {
        "display": "⟨,⟩",
        "insert": "\\langle •,\\, • \\rangle",
        "tip": "내적 (inner product)"
      },
      {
        "display": "·",
        "insert": "• \\cdot •",
        "tip": "점곱"
      },
      {
        "display": "A⁻¹",
        "insert": "•^{-1}",
        "tip": "역행렬"
      },
      {
        "display": "Tr",
        "insert": "\\operatorname{Tr}\\!\\left( • \\right)",
        "tip": "대각합 (trace)"
      },
      {
        "display": "det",
        "insert": "\\det\\!\\left( • \\right)",
        "tip": "행렬식"
      },
      {
        "display": "rank",
        "insert": "\\operatorname{rank}\\!\\left( • \\right)",
        "tip": "계수 (rank)"
      },
      {
        "display": "diag",
        "insert": "\\operatorname{diag}\\!\\left( • \\right)",
        "tip": "대각화"
      },
      {
        "display": "σ(·)",
        "insert": "\\sigma\\!\\left( • \\right)",
        "tip": "시그모이드/활성화"
      },
      {
        "display": "∇θ L",
        "insert": "\\nabla_{•} •",
        "tip": "파라미터 gradient",
        "display_block": true
      },
      {
        "display": "∝",
        "insert": "\\propto",
        "tip": "비례 (정규화 상수 생략)"
      },
      {
        "display": "log",
        "insert": "\\log",
        "tip": "로그"
      },
      {
        "display": "ln",
        "insert": "\\ln",
        "tip": "자연로그"
      },
      {
        "display": "exp",
        "insert": "\\exp\\!\\left( • \\right)",
        "tip": "지수함수"
      },
      {
        "display": "s.t.",
        "insert": "\\quad \\text{s.t.} \\quad •",
        "tip": "제약 조건 (subject to)"
      }
    ]
  }
];

// 자주쓰기 초기값 (도메인 빈출) — insert 문자열. 사용자가 쓰면 최근순으로 자가학습.
export const MATH_RECENT_DEFAULTS = [
  "\\frac{•}{•}",
  "•^{•}",
  "•_{•}",
  "\\sqrt{•}",
  "\\sum_{•}^{•} •",
  "\\int_{•}^{•} • \\, d•",
  "\\mathbb{E}\\!\\left[ • \\right]",
  "\\nabla •",
  "•^{\\top}",
  "\\langle •,\\, • \\rangle",
  "\\partial",
  "\\mathbb{R}^{•}",
];
