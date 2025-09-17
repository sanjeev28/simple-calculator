const { useState } = React;

function Calculator() {
  const calcnum = [
    'Del', 0, 1, 2, 3,
    4, 5, 6, 7, 8,
    9, '.', '=', '+',
    '-', '*', '/'
  ];

  const title = 'Calculator for daily life use';
  const [expr, setExpr] = useState('');

  const isOperator = (ch) => ['+', '-', '*', '/'].includes(ch);

  const handleInputChange = (e) => {
    setExpr(e.target.value);
  };

  const handleClick = (e) => {
    const val = e.currentTarget.getAttribute('data-value');

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

  return (
    <div className="calc-wrap">
      <div className="calc-card">
        <h2 className="calc-title">{title}</h2>
        <div className="display-row">
          <input
            type="text"
            className="calc-result"
            value={expr}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>
        <div className="calc-container">
          {calcnum.map((num, idx) => (
            <button
              key={String(num) + idx}
              data-value={num}
              className={"calc-keypad " + (String(num) === 'Del' ? 'key-del' : '')}
              onClick={handleClick}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <footer className="calc-footer">Made with ❤️ — Drop to Netlify by <a href="sanjeevchoudhary.com" target="_blank">Sanjeev</a></footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator />);
