import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Get('user/:userId')
  async getUserPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.getUserPosts(userId);
  }

  @Put(':id/user/:userId')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, userId, updatePostDto);
  }

  @Delete(':id/user/:userId')
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.deletePost(id, userId);
  }
}
