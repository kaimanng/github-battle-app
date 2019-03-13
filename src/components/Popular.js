import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'


// --------------------SEARCH LANGUAGE COMPONENT-------------------- //

class SearchLanguage extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }
  state = {
    language: '',
    repos: null
  }

  handleChange = (event) => {
    const value = event.target.value
    this.setState(() => ({ language: value }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSearch(this.state.language)
    this.setState({ language: '' })
  }

  render() {
    return (
      <div>
        <form className='searchRow' onSubmit={this.handleSubmit}>
          <input
            className='searchInput'
            type='text'
            placeholder='OR ... search your favourite language!'
            autoComplete='off'
            value={this.state.language}
            onChange={this.handleChange}
          />
          <button
            className='searchButton'
            type='submit'
            disabled={!this.state.language}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}


// --------------------SELECT LANGUAGE COMPONENT-------------------- //

function SelectLanguage({ selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className='languages'>
      {languages.map((lang) => (
        <li
          style={lang === selectedLanguage ? { color: '#d0021b' } : null}
          onClick={() => onSelect(lang)}
          key={lang}>
          {lang}
        </li>
      ))}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

function RepoGrid({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map(({ name, owner, html_url, stargazers_count }, index) => (
        <li
          key={name}
          className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={owner.avatar_url}
                alt={'Avatar for ' + owner.login} />
            </li>
            <li>
              <a href={html_url}>
                {name}
              </a>
            </li>
            <li>
              @{owner.login}
            </li>
            <li>
              {stargazers_count} stars
                </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}


// --------------------POPULAR LANGUAGE COMPONENT-------------------- //

class Popular extends React.Component {
    state = {
      selectedLanguage: 'All',
      repos: null
    }


  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = async (lang) => {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }))

    const repos = await fetchPopularRepos(lang)
    this.setState(() => ({ repos }))
  }

  updateSearchLanguage = async (lang) => {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }))

    const repos = await fetchPopularRepos(lang)
    this.setState(() => ({ repos }))
  }
  

  render() {
    const { selectedLanguage, repos } = this.state

    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        <SearchLanguage 
          onSearch={this.updateSearchLanguage}
        />
        {!repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

export default Popular