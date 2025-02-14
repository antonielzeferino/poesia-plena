const UserInfo = ({ user }: { user: { username: string; name: string | null } }) => (
  <>
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <p className="text-foreground">{user.name || "Não disponível"}</p>
        </div>
        <div>
          <p className="text-foreground text-[12px] opacity-50">{user.username}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <p className="text-foreground">
          posts: <span>0</span>
        </p>
        <p className="text-foreground">
          seguindo: <span>0</span>
        </p>
        <p className="text-foreground">
          seguidores: <span>0</span>
        </p>
      </div>
    </div>
  </>
);
export default UserInfo