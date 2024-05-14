import pygame
import sys
import random

pygame.init()

# Variables
screen_w = 800
screen_h = 500
size = (screen_w, screen_h)
screen = pygame.display.set_mode(size)

clock = pygame.time.Clock()

col_bg = '#E0E0E0'

pelota_pos_x = screen_w / 2
pelota_pos_y = screen_h / 2
pelota_vel_mult = 25
pelota_vel_x = -pelota_vel_mult + random.random() * 2 * pelota_vel_mult
pelota_vel_y = -1 + random.random() * 2
pelota_rad = 10
pelota_col = '#FF0000'

print (pelota_vel_y, pelota_vel_x)
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
            
    # --- START DRAW
    screen.fill(col_bg)
    pygame.draw.circle(screen, pelota_col, (pelota_pos_x, pelota_pos_y), pelota_rad)
    
    pelota_pos_x += pelota_vel_x
    pelota_pos_y += pelota_vel_y
    
    if pelota_pos_x > screen_w - pelota_rad:
        pelota_pos_x = screen_w - pelota_rad
        pelota_vel_x *= -1
    
    if pelota_pos_x < pelota_rad:
        pelota_pos_x = pelota_rad
        pelota_vel_x *= -1
        
    if pelota_pos_y > screen_h - pelota_rad:
        pelota_pos_y = screen_h - pelota_rad
        pelota_vel_y *= -1   
    
    if pelota_pos_y < pelota_rad:
        pelota_pos_y = pelota_rad
        pelota_vel_y *= -1
    
    # --- END DRAW
    pygame.display.flip()
    clock.tick(60)