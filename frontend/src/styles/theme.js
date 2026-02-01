export const theme = {
    colorScheme: 'dark',
    primaryColor: 'cyan',
    colors: {
        // High-contrast Kenneth K palette
        cyan: [
            '#e0ffff', '#b3feff', '#80fdff', '#4dfcff', '#1afbff', '#00f2ff', '#00c1cc', '#009199', '#006166', '#003133'
        ],
        purple: [
            '#f5e0ff', '#ebb3ff', '#e080ff', '#d64dff', '#cb1aff', '#bc13fe', '#960fcb', '#710b99', '#4b0766', '#260433'
        ],
        dark: [
            '#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2C2E33', '#25262B', '#1A1B1E', '#0A0A0F', '#030305'
        ],
    },
    defaultRadius: 'md',
    fontFamily: "'Inter', sans-serif",
    headings: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900,
    },
    components: {
        Button: {
            styles: (theme) => ({
                root: {
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                },
            }),
        },
        Card: {
            styles: (theme) => ({
                root: {
                    backgroundColor: 'rgba(10, 10, 15, 0.7)',
                    backdropFilter: 'blur(30px) saturate(150%)',
                    border: '1px solid rgba(0, 242, 255, 0.15)',
                    borderRadius: '20px',
                },
            }),
        },
        TextInput: {
            styles: (theme) => ({
                input: {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    '&:focus': {
                        borderColor: '#00f2ff',
                        boxShadow: '0 0 15px rgba(0, 242, 255, 0.2)',
                    },
                },
                label: {
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginBottom: '6px',
                },
            }),
        },
        PasswordInput: {
            styles: (theme) => ({
                input: {
                    backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
                    border: '1px solid rgba(255, 255, 255, 0.08) !important',
                    borderRadius: '10px',
                },
                innerInput: {
                    '&:focus': {
                        borderColor: '#00f2ff',
                    },
                },
                label: {
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginBottom: '6px',
                },
            }),
        },
    },
}
