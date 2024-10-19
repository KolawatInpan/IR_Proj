import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 800

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
LIGHT_BROWN = (240, 217, 181)
DARK_BROWN = (181, 136, 99)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
HIGHLIGHT = (0, 255, 0)

# Create the screen
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Checkers Game")

# Clock for controlling the frame rate
clock = pygame.time.Clock()

tile_size = SCREEN_WIDTH // 8


def draw_board():
    for row in range(8):
        for col in range(8):
            color = LIGHT_BROWN if (row + col) % 2 == 0 else DARK_BROWN
            pygame.draw.rect(screen, color, pygame.Rect(
                col * tile_size, row * tile_size, tile_size, tile_size))


class Piece(pygame.sprite.Sprite):
    def __init__(self, color, x, y):
        super().__init__()
        self.image = pygame.Surface((tile_size, tile_size), pygame.SRCALPHA)
        self.color = color
        self.king = False
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)
        self.draw_piece()

    def draw_piece(self):
        radius = tile_size // 2 - 10
        pygame.draw.circle(self.image, self.color,
                           (tile_size // 2, tile_size // 2), radius)
        if self.king:
            pygame.draw.circle(self.image, WHITE,
                               (tile_size // 2, tile_size // 2), radius // 2)

    def make_king(self):
        self.king = True
        self.draw_piece()


def initialize_pieces():
    pieces = pygame.sprite.Group()

    # Initialize red pieces
    for row in range(3):
        for col in range(8):
            if (row + col) % 2 == 1:
                pieces.add(Piece(RED, col * tile_size, row * tile_size))

    # Initialize blue pieces
    for row in range(5, 8):
        for col in range(8):
            if (row + col) % 2 == 1:
                pieces.add(Piece(BLUE, col * tile_size, row * tile_size))

    return pieces


def get_piece_at(pieces, row, col):
    for piece in pieces:
        if piece.rect.topleft == (col * tile_size, row * tile_size):
            return piece
    return None


def get_valid_moves(piece, pieces):
    valid_moves = []
    row, col = piece.rect.y // tile_size, piece.rect.x // tile_size
    directions = [(-1, -1), (-1, 1)
                  ] if piece.color == RED else [(1, -1), (1, 1)]
    if piece.king:
        directions += [(1, -1), (1, 1)
                       ] if piece.color == RED else [(-1, -1), (-1, 1)]

    for dr, dc in directions:
        new_row, new_col = row + dr, col + dc
        if 0 <= new_row < 8 and 0 <= new_col < 8 and not get_piece_at(pieces, new_row, new_col):
            valid_moves.append((new_row, new_col))
        elif 0 <= new_row + dr < 8 and 0 <= new_col + dc < 8 and not get_piece_at(pieces, new_row + dr, new_col + dc):
            middle_piece = get_piece_at(pieces, new_row, new_col)
            if middle_piece and middle_piece.color != piece.color:
                valid_moves.append((new_row + dr, new_col + dc))

    return valid_moves


def draw_valid_moves(valid_moves):
    for row, col in valid_moves:
        pygame.draw.rect(screen, HIGHLIGHT, pygame.Rect(
            col * tile_size, row * tile_size, tile_size, tile_size))


def handle_piece_movement(pieces, turn, selected_piece, valid_moves):
    mouse_x, mouse_y = pygame.mouse.get_pos()
    tile_size = SCREEN_WIDTH // 8

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            return False, turn, selected_piece, valid_moves
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if selected_piece and (mouse_y // tile_size, mouse_x // tile_size) in valid_moves:
                new_row, new_col = mouse_y // tile_size, mouse_x // tile_size
                row_diff = new_row - selected_piece.rect.y // tile_size
                col_diff = new_col - selected_piece.rect.x // tile_size
                if abs(row_diff) == 1 and abs(col_diff) == 1:
                    selected_piece.rect.topleft = (
                        new_col * tile_size, new_row * tile_size)
                    if (turn == RED and new_row == 7) or (turn == BLUE and new_row == 0):
                        selected_piece.make_king()
                    turn = BLUE if turn == RED else RED
                elif abs(row_diff) == 2 and abs(col_diff) == 2:
                    middle_row = (selected_piece.rect.y //
                                  tile_size + new_row) // 2
                    middle_col = (selected_piece.rect.x //
                                  tile_size + new_col) // 2
                    middle_piece = get_piece_at(pieces, middle_row, middle_col)
                    if middle_piece and middle_piece.color != selected_piece.color:
                        pieces.remove(middle_piece)
                        selected_piece.rect.topleft = (
                            new_col * tile_size, new_row * tile_size)
                        if (turn == RED and new_row == 7) or (turn == BLUE and new_row == 0):
                            selected_piece.make_king()
                        turn = BLUE if turn == RED else RED
                selected_piece = None
                valid_moves = []
            else:
                for piece in pieces:
                    if piece.rect.collidepoint(event.pos) and piece.color == turn:
                        selected_piece = piece
                        valid_moves = get_valid_moves(selected_piece, pieces)
                        break

    return True, turn, selected_piece, valid_moves


def ai_move(pieces):
    blue_pieces = [piece for piece in pieces if piece.color == BLUE]
    random_piece = random.choice(blue_pieces)
    valid_moves = get_valid_moves(random_piece, pieces)
    if valid_moves:
        new_row, new_col = random.choice(valid_moves)
        random_piece.rect.topleft = (new_col * tile_size, new_row * tile_size)
        if new_row == 0:
            random_piece.make_king()


# Main game loop
running = True
pieces = initialize_pieces()
turn = RED
selected_piece = None
valid_moves = []

while running:
    screen.fill(BLACK)
    draw_board()
    pieces.draw(screen)
    if selected_piece:
        draw_valid_moves(valid_moves)
    if turn == RED:
        running, turn, selected_piece, valid_moves = handle_piece_movement(
            pieces, turn, selected_piece, valid_moves)
    else:
        ai_move(pieces)
        turn = RED
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
