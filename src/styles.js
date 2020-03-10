export function getButtonStyle(color, enabled = true) {
  return {
    color: color,
    backgroundColor: 'white',
    border: `2px solid ${color}`,
    borderRadius: '10px',
    padding: 10,
    height: 48,
    minWidth: 48,
    textTransform: 'uppercase',
    fontSize: '16px',
    display: 'inline-flex',
    justifyContent: 'center',
    outline: 'none',
    fill: 'currentColor',
    ...enabled && {
      '&:hover': {
        backgroundColor: color,
        color: 'white',
        cursor: 'pointer'
      }
    },
    ...!enabled && {
      '&:hover': {
        cursor: 'not-allowed',
        backgroundColor: 'lightgray'
      }
    }
  }
}
