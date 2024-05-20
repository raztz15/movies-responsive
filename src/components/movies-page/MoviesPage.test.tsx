import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { MoviesPage } from './MoviesPage'

// Mocking fetch to return a fixed set of movies for testing
global.fetch = jest.fn().mockResolvedValue({
  json: () =>
    Promise.resolve([
      {
        id: '1',
        title: 'Movie 1',
        image: 'movie1.jpg',
        synopsis: 'Synopsis 1',
        rating: '5',
        type: 'Action',
        released: '2022',
        runtime: '120 mins',
        largeimage: 'movie1_large.jpg',
        unogsdate: '2021-01-01',
        imdbid: 'tt1234567',
        download: 'http://example.com/download/movie1',
      },
    ]),
});

describe('MoviesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input and movie cards', async () => {
    const { getByPlaceholderText, getByTestId } = render(<MoviesPage />);

    // Check if search input is rendered
    expect(getByPlaceholderText('Search Movie...')).toBeInTheDocument();

    // Wait for movies to be fetched
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Check if movie cards are rendered
    expect(getByTestId('movies-list')).toBeInTheDocument();
  });

  test('search functionality works', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <MoviesPage />
    );

    // Wait for movies to be fetched
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Enter search query and check if movies are filtered accordingly
    const searchInput = getByPlaceholderText('Search Movie...');
    fireEvent.change(searchInput, { target: { value: 'Movie 1' } });

    // Wait for debounce effect
    await waitFor(() =>
      expect(getByTestId('movies-list')).toContainElement(getByText('Movie 1'))
    );
  });

  test('handles no movies found', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    const { getByTestId, getByText } = render(<MoviesPage />);

    // Wait for movies to be fetched
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Check if "No movies to display" message is rendered
    expect(getByTestId('movies-list')).toBeEmptyDOMElement();
    expect(getByText('No movies to display')).toBeInTheDocument();
  });
});