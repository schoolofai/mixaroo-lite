import chalk from 'chalk';

const BASH_COMPLETION = `# mx-lite bash completion
# Add to ~/.bashrc: eval "$(mx-lite completions bash)"
_mx_lite() {
  local cur prev commands opts
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"

  commands="setup config list play history completions help"
  opts="-l --length -p --provider -s --save -v --verbose -h --help -V --version"

  case "\${prev}" in
    config)
      COMPREPLY=( $(compgen -W "show reset path set" -- "\${cur}") )
      return 0
      ;;
    completions)
      COMPREPLY=( $(compgen -W "bash zsh fish" -- "\${cur}") )
      return 0
      ;;
    --provider|-p)
      COMPREPLY=( $(compgen -W "openai gemini anthropic" -- "\${cur}") )
      return 0
      ;;
    --length|-l|--limit)
      return 0
      ;;
  esac

  if [[ "\${cur}" == -* ]]; then
    COMPREPLY=( $(compgen -W "\${opts}" -- "\${cur}") )
  elif [[ \${COMP_CWORD} -eq 1 ]]; then
    COMPREPLY=( $(compgen -W "\${commands}" -- "\${cur}") )
  fi

  return 0
}
complete -F _mx_lite mx-lite`;

const ZSH_COMPLETION = `#compdef mx-lite
# mx-lite zsh completion
# Add to ~/.zshrc: eval "$(mx-lite completions zsh)"

_mx_lite() {
  local -a commands subcommands providers shells

  commands=(
    'setup:Configure your AI provider and API key'
    'config:Manage configuration'
    'list:Show saved playlists'
    'play:Open a saved playlist by ID'
    'history:Show playlist generation history'
    'completions:Generate shell completion script'
    'help:Display help'
  )

  subcommands=(
    'show:Display current configuration'
    'reset:Reset all configuration'
    'path:Show configuration file path'
    'set:Set a configuration value'
  )

  providers=(openai gemini anthropic)
  shells=(bash zsh fish)

  _arguments -C \\
    '1:command:->command' \\
    '*::arg:->args' \\
    '(-l --length)'{-l,--length}'[Number of songs]:count' \\
    '(-p --provider)'{-p,--provider}'[AI provider]:provider:('"$providers"')' \\
    '(-s --save)'{-s,--save}'[Save the playlist locally]' \\
    '(-v --verbose)'{-v,--verbose}'[Show debug output]' \\
    '(-h --help)'{-h,--help}'[Show help]' \\
    '(-V --version)'{-V,--version}'[Show version]'

  case "\$state" in
    command)
      _describe 'command' commands
      ;;
    args)
      case "\${words[1]}" in
        config)
          _describe 'subcommand' subcommands
          ;;
        completions)
          _describe 'shell' shells
          ;;
      esac
      ;;
  esac
}

_mx_lite "$@"`;

const FISH_COMPLETION = `# mx-lite fish completion
# Add to ~/.config/fish/completions/mx-lite.fish

# Disable file completions
complete -c mx-lite -f

# Commands
complete -c mx-lite -n '__fish_use_subcommand' -a setup -d 'Configure your AI provider and API key'
complete -c mx-lite -n '__fish_use_subcommand' -a config -d 'Manage configuration'
complete -c mx-lite -n '__fish_use_subcommand' -a list -d 'Show saved playlists'
complete -c mx-lite -n '__fish_use_subcommand' -a play -d 'Open a saved playlist by ID'
complete -c mx-lite -n '__fish_use_subcommand' -a history -d 'Show playlist generation history'
complete -c mx-lite -n '__fish_use_subcommand' -a completions -d 'Generate shell completion script'
complete -c mx-lite -n '__fish_use_subcommand' -a help -d 'Display help'

# Config subcommands
complete -c mx-lite -n '__fish_seen_subcommand_from config' -a show -d 'Display current configuration'
complete -c mx-lite -n '__fish_seen_subcommand_from config' -a reset -d 'Reset all configuration'
complete -c mx-lite -n '__fish_seen_subcommand_from config' -a path -d 'Show configuration file path'
complete -c mx-lite -n '__fish_seen_subcommand_from config' -a set -d 'Set a configuration value'

# Completions subcommands
complete -c mx-lite -n '__fish_seen_subcommand_from completions' -a 'bash zsh fish'

# Global flags
complete -c mx-lite -s l -l length -d 'Number of songs (1-100)' -x
complete -c mx-lite -s p -l provider -d 'AI provider' -xa 'openai gemini anthropic'
complete -c mx-lite -s s -l save -d 'Save the playlist locally'
complete -c mx-lite -s v -l verbose -d 'Show debug output'
complete -c mx-lite -s h -l help -d 'Show help'
complete -c mx-lite -s V -l version -d 'Show version'

# History flags
complete -c mx-lite -n '__fish_seen_subcommand_from history' -l limit -d 'Number of entries to show' -x`;

const SHELLS: Record<string, string> = {
  bash: BASH_COMPLETION,
  zsh: ZSH_COMPLETION,
  fish: FISH_COMPLETION,
};

export async function completionsCommand(shell: string): Promise<void> {
  if (!shell) {
    console.error(chalk.red('❌ Please specify a shell: bash, zsh, or fish'));
    console.log();
    console.log(chalk.yellow('Usage:'));
    console.log(chalk.cyan('  mx-lite completions bash'));
    console.log(chalk.cyan('  mx-lite completions zsh'));
    console.log(chalk.cyan('  mx-lite completions fish'));
    process.exit(1);
  }

  const script = SHELLS[shell.toLowerCase()];

  if (!script) {
    console.error(chalk.red(`❌ Unknown shell: ${shell}`));
    console.log();
    console.log(`Supported shells: ${chalk.cyan('bash')}, ${chalk.cyan('zsh')}, ${chalk.cyan('fish')}`);
    process.exit(1);
  }

  // Output raw script (for eval/piping)
  process.stdout.write(script + '\n');
}
