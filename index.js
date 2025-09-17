const { useState, useEffect } = React;

function Calculator() {
  const calcButtons = [
    { label: 'C', value: 'clear', className: 'key-del' },
    { label: 'Del', value: 'Del', className: 'key-del' },
    { label: '%', value: '%', className: 'operator' },
    { label: '÷', value: '/', className: 'operator' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '×', value: '*', className: 'operator' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '-', value: '-', className: 'operator' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '+', value: '+', className: 'operator' },
    { label: '0', value: '0', className: 'zero' },
    { label: '.', value: '.' },
    { label: '=', value: '=', className: 'equals' }
  ];

  const title = 'Modern Calculator';
  const [expr, setExpr] = useState('');
  const [history, setHistory] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const isOperator = (ch) => ['+', '-', '*', '/', '%'].includes(ch);

  const handleInputChange = (e) => {
    setExpr(e.target.value);
  };

  const handleClick = (val) => {
    if (val === 'clear') {
      setExpr('');
      setHistory('');
      return;
    }

    if (val === 'Del') {
      setExpr((s) => s.slice(0, -1));
      return;
    }

    if (val === '=') {
      try {
        if (expr === '') return;
        const last = expr[expr.length - 1];
        if (isOperator(last)) return;
        const result = new Function('"use strict"; return (' + expr + ')')();
        setHistory(expr + ' =');
        setExpr(String(result));
      } catch (err) {
        setExpr('Error');
        setTimeout(() => setExpr(''), 800);
      }
      return;
    }

    if (isOperator(val)) {
      if (expr === '' && val !== '-') return;
      const last = expr[expr.length - 1];
      if (isOperator(last)) {
        setExpr((s) => s.slice(0, -1) + val);
        return;
      }
      setExpr((s) => s + val);
      return;
    }

    if (val === '.') {
      const parts = expr.split(/[\+\-\*\/]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) return;
      setExpr((s) => s + '.');
      return;
    }

    setExpr((s) => s + String(val));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="calc-wrap">
      <div className="calc-card">
        <div className="calc-header">
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
          </button>
          <h2 className="calc-title">{title}</h2>
          <div style={{width: '42px'}}></div>
        </div>
        
        <div className="display-row">
          <div className="calc-history">{history}</div>
          <input
            type="text"
            className="calc-result"
            value={expr}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>
        
        <div className="calc-container">
          {calcButtons.map((btn, idx) => (
            <button
              key={btn.value + idx}
              className={`calc-keypad ${btn.className || ''}`}
              onClick={() => handleClick(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      
      <footer className="calc-footer">
        Made with <span className="heart">❤️</span> by <a href="https://sanjeevchoudhary.com" target="_blank">Sanjeev</a>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator />);
