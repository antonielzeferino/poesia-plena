export type User = {
   id: string;
   username: string;
   name: string;
   bio: string;
   password: string;
   createdAt: string;
   isActive: boolean;
   poems: Poem[];
   comments: Comment[];
   followers: Follower[];
   following: Follower[];
   likes: Like[];
   savedPoems: SavedPoem[];
};
