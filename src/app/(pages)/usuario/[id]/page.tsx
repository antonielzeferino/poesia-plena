import Loading from "@/app/Loading";

export type Poem = {
   id: string;
   title: string;
   content: string;
   authorId: string;
   createdAt: string;
 };
 
 export type Like = {
   id: string;
   userId: string;
   poemId: string;
   createdAt: string;
 };
 
 export type Comment = {
   id: string;
   userId: string;
   poemId: string;
   content: string;
   createdAt: string;
 };
 
 export type Follower = {
   id: string;
   userId: string;
   followerId: string;
   createdAt: string;
 };
 
 export type SavedPoem = {
   id: string;
   userId: string;
   poemId: string;
   createdAt: string;
 };
 
 export type User = {
   id: string;
   username: string;
   name: string;
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
 

const getUser = async (id: string) => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
         cache: "no-store",
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       });
      
      if (!res.ok) {
         throw new Error("Erro ao buscar usuário");
      }

      const data: User = await res.json();
      return data;
   } catch (err) {
      console.error("Erro na requisição:", err);
      return null;
   }
};

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
   const { id } = await params;

   const user = await getUser(id);

   return (
      <div>
         <h1 className="w-full text-start">Perfil do Usuário (em desenvolvimento)</h1>
         {!user ? (
            <Loading />
         ) : (
            <div>
               <h2>{user.username}</h2>
               <div>
                  <p>Name: {user.name}</p>
                  <p>Username: {user.username}</p>
                  <p>Active: {user.isActive ? "Yes" : "No"}</p>
                  <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
                  <h3>Poems:</h3>
                  <ul>
                     {user.poems.map((poem) => (
                        <li key={poem.id}>
                           <h4>{poem.title}</h4>
                        </li>
                     ))}
                  </ul>
                  <h3>Followers:</h3>
                  <ul>
                     {user.followers.map((follower) => (
                        <li key={follower.id}>{follower.followerId}</li>
                     ))}
                  </ul>
                  <h3>Following:</h3>
                  <ul>
                     {user.following.map((follow) => (
                        <li key={follow.id}>{follow.userId}</li>
                     ))}
                  </ul>
               </div>
            </div>
         )}
      </div>
   );
};

export default UserPage;
